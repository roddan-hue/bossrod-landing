#!/usr/bin/env bash
set -e

BUCKET_NAME=${1:-"bossrod-landing-website"}
DISTRIBUTION_ID=${2:-""}

echo "🚀 Step 1: Building production bundle with Vite..."
npm run build

echo "📦 Step 2: Syncing build assets to S3 (s3://${BUCKET_NAME})..."
aws s3 sync dist/ "s3://${BUCKET_NAME}" --delete --cache-control "public, max-age=31536000, immutable" --exclude "index.html"
aws s3 cp dist/index.html "s3://${BUCKET_NAME}/index.html" --cache-control "no-cache, no-store, must-revalidate"

if [ -n "$DISTRIBUTION_ID" ]; then
  echo "⚡ Step 3: Invalidating CloudFront cache (${DISTRIBUTION_ID})..."
  aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*"
fi

echo "✅ Deployment completed successfully! Visit https://bossrod.com"
