output "s3_bucket_name" {
  description = "Name of the S3 bucket hosting website files"
  value       = aws_s3_bucket.landing_bucket.id
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution for cache invalidation"
  value       = aws_cloudfront_distribution.landing_distribution.id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.landing_distribution.domain_name
}

output "website_url" {
  description = "Live custom URL"
  value       = "https://${var.domain_name}"
}
