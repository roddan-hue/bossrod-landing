const { CloudWatchClient, GetMetricDataCommand } = require('@aws-sdk/client-cloudwatch');

const cw = new CloudWatchClient({ region: 'us-east-1' });

const DISTRIBUTIONS = [
  { id: 'mahjong', name: 'Visayan Mahjong', subdomain: 'mahjong.bossrod.com', distId: 'E384N8OGBWO7XK' },
  { id: 'quizme', name: 'QuizMe', subdomain: 'quizme.bossrod.com', distId: 'E20XMOENAFE9MD' },
  { id: 'movies', name: 'Movies', subdomain: 'movies.bossrod.com', distId: 'E3JR6BCQOSBSWH' },
  { id: 'shop', name: 'TrendShop', subdomain: 'shop.bossrod.com', distId: 'E950R085441RK' },
  { id: 'hub', name: 'Apex Hub', subdomain: 'bossrod.com', distId: 'E1Z9CTLWCZ2R7' },
];

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
  };

  if (event.requestContext?.http?.method === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const now = new Date();
    const startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const queries = [];

    // Build metric queries for each distribution
    DISTRIBUTIONS.forEach((d) => {
      // Requests query
      queries.push({
        Id: `req_${d.id}`,
        MetricStat: {
          Metric: {
            Namespace: 'AWS/CloudFront',
            MetricName: 'Requests',
            Dimensions: [
              { Name: 'DistributionId', Value: d.distId },
              { Name: 'Region', Value: 'Global' },
            ],
          },
          Period: 86400,
          Stat: 'Sum',
        },
      });

      // Bytes downloaded query
      queries.push({
        Id: `bytes_${d.id}`,
        MetricStat: {
          Metric: {
            Namespace: 'AWS/CloudFront',
            MetricName: 'BytesDownloaded',
            Dimensions: [
              { Name: 'DistributionId', Value: d.distId },
              { Name: 'Region', Value: 'Global' },
            ],
          },
          Period: 86400,
          Stat: 'Sum',
        },
      });
    });

    const command = new GetMetricDataCommand({
      StartTime: startTime,
      EndTime: now,
      MetricDataQueries: queries,
    });

    const response = await cw.send(command);

    const resultMap = {};
    for (const res of response.MetricDataResults || []) {
      resultMap[res.Id] = {
        timestamps: res.Timestamps,
        values: res.Values,
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        updatedAt: now.toISOString(),
        distributions: DISTRIBUTIONS,
        metrics: resultMap,
      }),
    };
  } catch (err) {
    console.error('Error fetching CloudWatch metrics:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
