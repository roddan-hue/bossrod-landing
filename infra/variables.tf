variable "aws_region" {
  description = "AWS region for primary resources (S3, etc.)"
  type        = string
  default     = "ap-southeast-1"
}

variable "domain_name" {
  description = "Apex domain name for the landing page"
  type        = string
  default     = "bossrod.com"
}

variable "subdomain_aliases" {
  description = "Additional domain aliases to route to this landing page"
  type        = list(string)
  default     = ["www.bossrod.com"]
}
