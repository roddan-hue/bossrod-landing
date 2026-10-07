# Deploy script for bossrod-landing to AWS S3 & CloudFront
param (
    [string]$BucketName = "bossrod-landing-website",
    [string]$DistributionId = "E1Z9CTLWCZ2R7"
)

$ErrorActionPreference = "Stop"

Write-Host "Step 1: Building production bundle with Vite..." -ForegroundColor Cyan
npm run build

Write-Host "Step 2: Syncing build assets to S3 (s3://$BucketName)..." -ForegroundColor Cyan
aws s3 sync dist/ "s3://$BucketName" --delete --cache-control "public, max-age=31536000, immutable" --exclude "index.html" --exclude "ads.txt" --exclude "robots.txt" --exclude "sitemap.xml" --exclude "privacy.html" --exclude "terms.html"
aws s3 cp dist/index.html "s3://$BucketName/index.html" --cache-control "no-cache, no-store, must-revalidate" --content-type "text/html"
aws s3 cp dist/privacy.html "s3://$BucketName/privacy.html" --cache-control "public, max-age=86400, must-revalidate" --content-type "text/html"
aws s3 cp dist/terms.html "s3://$BucketName/terms.html" --cache-control "public, max-age=86400, must-revalidate" --content-type "text/html"
aws s3 cp dist/ads.txt "s3://$BucketName/ads.txt" --cache-control "public, max-age=3600, must-revalidate" --content-type "text/plain"
aws s3 cp dist/robots.txt "s3://$BucketName/robots.txt" --cache-control "public, max-age=3600, must-revalidate" --content-type "text/plain"
aws s3 cp dist/sitemap.xml "s3://$BucketName/sitemap.xml" --cache-control "public, max-age=3600, must-revalidate" --content-type "application/xml"

if ($DistributionId) {
    Write-Host "Step 3: Invalidating CloudFront cache ($DistributionId)..." -ForegroundColor Cyan
    aws cloudfront create-invalidation --distribution-id $DistributionId --paths "/*"
}

Write-Host "Deployment completed successfully! Visit https://bossrod.com" -ForegroundColor Green
