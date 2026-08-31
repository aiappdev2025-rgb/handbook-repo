---
id: "X-17-1"
title: "Vercel Project Setup"
tool: "claude-code"
chapter: 17
variant: "canonical"
source: "archive/html-v3/handbook"
---

```text
Verify the Vercel deployment is working correctly.

1. Trigger a redeployment in Vercel Dashboard:
   - Go to Deployments tab
   - Click the three dots on the failed deployment
   - Select "Redeploy"

2. While that deploys, pull environment variables for local development:
   vercel link
   vercel env pull .env.local

3. Start the development server:
   npm run dev

4. Verify locally:
   - App loads at localhost:3000
   - No console errors about missing env vars
   - Open browser DevTools → Network tab
   - Look for requests to your Supabase URL (should return 200)

5. Verify the Vercel deployment:
   - Check the deployment completed successfully (green status)
   - Click the deployment URL to open the preview
   - Verify the app loads without errors
```
