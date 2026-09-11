terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Provider specifically for CloudFront ACM Certificates (must always be us-east-1)
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

# -------------------------------------------------------------
# Route 53 Hosted Zone Lookup
# -------------------------------------------------------------
data "aws_route53_zone" "primary" {
  name         = var.domain_name
  private_zone = false
}

# -------------------------------------------------------------
# ACM SSL Certificate (Free auto-renewing SSL certificate)
# -------------------------------------------------------------
resource "aws_acm_certificate" "cert" {
  provider                  = aws.us_east_1
  domain_name               = var.domain_name
  subject_alternative_names = var.subdomain_aliases
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.primary.zone_id
}

resource "aws_acm_certificate_validation" "cert_validation" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

# -------------------------------------------------------------
# S3 Bucket for Static Website Hosting (Secured with OAC)
# -------------------------------------------------------------
resource "aws_s3_bucket" "landing_bucket" {
  bucket = "bossrod-landing-website"
}

resource "aws_s3_bucket_public_access_block" "landing_bucket_block" {
  bucket = aws_s3_bucket.landing_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CloudFront Origin Access Control (modern replacement for OAI)
resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "bossrod-landing-oac"
  description                       = "OAC for bossrod.com static landing page"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# Bucket Policy allowing only CloudFront to read objects
resource "aws_s3_bucket_policy" "landing_bucket_policy" {
  bucket = aws_s3_bucket.landing_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontServicePrincipalReadOnly"
        Effect    = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.landing_bucket.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.landing_distribution.arn
          }
        }
      }
    ]
  })
}

# -------------------------------------------------------------
# CloudFront Distribution (Global CDN Edge)
# -------------------------------------------------------------
resource "aws_cloudfront_distribution" "landing_distribution" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases             = concat([var.domain_name], var.subdomain_aliases)

  origin {
    domain_name              = aws_s3_bucket.landing_bucket.bucket_regional_domain_name
    origin_id                = "S3-bossrod-landing"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-bossrod-landing"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    compress               = true
  }

  # SPA / Routing Fallback (redirects 404 to index.html with 200 OK)
  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }

  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }

  price_class = "PriceClass_100" # US, Canada & Europe edge locations (lowest cost)

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.cert_validation.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

# -------------------------------------------------------------
# Route 53 DNS Records (Apex domain & www alias pointing to CloudFront)
# -------------------------------------------------------------
resource "aws_route53_record" "apex" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.landing_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.landing_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "apex_ipv6" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = var.domain_name
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.landing_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.landing_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.landing_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.landing_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
