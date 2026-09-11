# Deploy script for bossrod-landing to AWS S3 & CloudFront
param (
    [string]$BucketName = "bossrod-landing-website",
    [string]$DistributionId = ""
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Step 1: Building production bundle with Vite..." -ForegroundColor Cyan
npm run build

Write-Host "📦 Step 2: Syncing build assets to S3 (s3://$BucketName)..." -ForegroundColor Cyan
aws s3 sync dist/ "s3://$BucketName" --delete --cache-control "public, max-age=31536000, immutable" --exclude "index.html"
aws s3 cp dist/index.html "s3://$BucketName/index.html" --cache-control "no-cache, no-store, must-revalidate"

if ($DistributionId -ne "") {
    Write-Host "⚡ Step 3: Invalidating CloudFront cache ($DistributionId)..." -ForegroundColor Cyan
    aws cloudfront create-invalidation --distribution-id $DistributionId --paths "/*"
} else {
    Write-Host "ℹ️ Tip: Pass -DistributionId <ID> to automatically invalidate CloudFront edge cache." -ForegroundColor Yellow
}

Write-Host "✅ Deployment completed successfully! Visit https://bossrod.com" -ForegroundColor Green
