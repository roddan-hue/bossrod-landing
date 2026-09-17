# -------------------------------------------------------------
# CloudWatch Metrics Aggregator Lambda Function
# -------------------------------------------------------------



resource "aws_iam_role" "metrics_lambda_role" {
  name = "bossrod-metrics-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "metrics_lambda_policy" {
  name = "bossrod-metrics-cloudwatch-policy"
  role = aws_iam_role.metrics_lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "cloudwatch:GetMetricData",
          "cloudwatch:ListMetrics"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

resource "aws_lambda_function" "metrics_api" {
  filename         = "${path.module}/lambda/metrics.zip"
  function_name    = "bossrod-metrics-api"
  role             = aws_iam_role.metrics_lambda_role.arn
  handler          = "metrics.handler"
  runtime          = "nodejs20.x"
  source_code_hash = filebase64sha256("${path.module}/lambda/metrics.zip")
  timeout          = 15
  memory_size      = 128
}

# Dedicated HTTPS Function URL with CORS for the frontend dashboard
resource "aws_lambda_function_url" "metrics_url" {
  function_name      = aws_lambda_function.metrics_api.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = false
    allow_origins     = ["*"]
    allow_methods     = ["GET", "OPTIONS"]
    allow_headers     = ["content-type", "x-api-key"]
    max_age           = 86400
  }
}

output "metrics_function_url" {
  description = "HTTPS endpoint for live CloudWatch metrics"
  value       = aws_lambda_function_url.metrics_url.function_url
}
