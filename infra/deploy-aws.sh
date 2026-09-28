#!/usr/bin/env bash
set -e

BUCKET_NAME=${1:-"bossrod-landing-website"}
DISTRIBUTION_ID=${2:-""}

echo "🚀 Step 1: Building production bundle with Vite..."
npm run build

echo "📦 Step 2: Syncing build assets to S3 (s3://${BUCKET_NAME})..."
aws s3 sync dist/ "s3://${BUCKET_NAME}" --delete --cache-control "public, max-age=31536000, immutable" --exclude "index.html" --exclude "ads.txt" --exclude "robots.txt" --exclude "sitemap.xml" --exclude "privacy.html" --exclude "terms.html"
aws s3 cp dist/index.html "s3://${BUCKET_NAME}/index.html" --cache-control "no-cache, no-store, must-revalidate" --content-type "text/html"
aws s3 cp dist/privacy.html "s3://${BUCKET_NAME}/privacy.html" --cache-control "public, max-age=86400, must-revalidate" --content-type "text/html"
aws s3 cp dist/terms.html "s3://${BUCKET_NAME}/terms.html" --cache-control "public, max-age=86400, must-revalidate" --content-type "text/html"
aws s3 cp dist/ads.txt "s3://${BUCKET_NAME}/ads.txt" --cache-control "public, max-age=3600, must-revalidate" --content-type "text/plain"
aws s3 cp dist/robots.txt "s3://${BUCKET_NAME}/robots.txt" --cache-control "public, max-age=3600, must-revalidate" --content-type "text/plain"
aws s3 cp dist/sitemap.xml "s3://${BUCKET_NAME}/sitemap.xml" --cache-control "public, max-age=3600, must-revalidate" --content-type "application/xml"

if [ -n "$DISTRIBUTION_ID" ]; then
  echo "⚡ Step 3: Invalidating CloudFront cache (${DISTRIBUTION_ID})..."
  aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*"
fi

echo "✅ Deployment completed successfully! Visit https://bossrod.com"
