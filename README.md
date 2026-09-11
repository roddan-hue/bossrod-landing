# bossrod.com • Ecosystem Landing Hub

Modern, responsive **Bento Grid** landing page and portfolio portal for `bossrod.com` showcasing active subdomains (`movies.bossrod.com` and `shop.bossrod.com`), personal engineering highlights, and future experiments.

---

## ⚡ Tech Stack

* **Frontend**: React 19 + TypeScript + Vite
* **Styling**: Tailwind CSS v4 + Glassmorphism & Custom Glow Effects
* **Icons & Animation**: Lucide React + Canvas Confetti + Custom Cursor Spotlights
* **Infrastructure**: AWS S3 + CloudFront (Edge CDN) + Route 53 + ACM (Free SSL)
* **CI/CD**: GitHub Actions

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start local Vite development server
npm run dev

# 3. Build production distribution
npm run build
```

---

## 🧩 Adding or Updating Subdomains

All subdomain data is centralized in:
`src/data/subdomains.ts`

To add a new subdomain (e.g. `api.bossrod.com` or `blog.bossrod.com`), simply add an entry to the `SUBDOMAINS` array:

```typescript
{
  id: 'api',
  name: 'Bossrod API Gateway',
  subdomain: 'api.bossrod.com',
  url: 'https://api.bossrod.com',
  badge: 'Developer Tools',
  tagline: 'High-performance microservices and data pipelines',
  description: 'Public and authenticated endpoints for media and trends metadata.',
  techStack: ['FastAPI', 'AWS Lambda', 'DynamoDB'],
  accentColor: {
    border: 'hover:border-cyan-500/50',
    glow: 'rgba(6, 182, 212, 0.15)',
    badgeBg: 'bg-cyan-500/10 border-cyan-500/30',
    badgeText: 'text-cyan-400',
    button: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-500/25',
  },
  previewType: 'generic',
}
```

---

## ☁️ AWS Infrastructure & Deployment

### Option A: Manual CLI Deploy (PowerShell or Bash)

Ensure you have the [AWS CLI](https://aws.amazon.com/cli/) configured (`aws configure`):

```powershell
# In PowerShell:
.\infra\deploy-aws.ps1 -BucketName "bossrod-landing-website" -DistributionId "YOUR_CLOUDFRONT_ID"
```

```bash
# In Bash:
./infra/deploy-aws.sh "bossrod-landing-website" "YOUR_CLOUDFRONT_ID"
```

### Option B: Automated Terraform Provisioning

The `infra/` folder contains production-ready Terraform to provision:
* Private S3 bucket with Origin Access Control (OAC)
* Global CloudFront distribution with HTTPS redirection and HTTP/2/3
* Route 53 alias records for `bossrod.com` and `www.bossrod.com`
* Free auto-renewing ACM SSL certificate in `us-east-1`

```bash
cd infra
terraform init
terraform plan
terraform apply
```

### Option C: GitHub Actions CI/CD (Gated Manual Deployment)

The workflow is split into two distinct stages:
1. **Push to `main`**: Automatically runs the **Build & Test** job to ensure TypeScript compiles and assets bundle cleanly, uploading the production artifact. The deploy job is **never** executed automatically.
2. **Deploy to AWS (Manual Trigger)**:
   - Go to your repository's **Actions** tab on GitHub.
   - Select **"Build & Deploy to AWS"**.
   - Click the **"Run workflow"** button, keep `deploy_to_aws: true`, and click **Run workflow**.

Set these secrets in your GitHub repository (`Settings > Secrets and variables > Actions`):
* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`
* `AWS_S3_BUCKET_NAME` (e.g. `bossrod-landing-website`)
* `AWS_CLOUDFRONT_DISTRIBUTION_ID` (optional, for cache invalidation)
