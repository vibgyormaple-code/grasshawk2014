Frontend deploy (Vercel)

This page explains how to deploy the `frontend/` folder on Vercel.

1) Confirm the frontend builds locally
   cd frontend
   npm ci
   npm run build

2) Project settings on Vercel
   - Create a new Vercel project and connect your GitHub repository.
   - Root directory: `/` (we provide a root `vercel.json` and root `package.json` that run the frontend build) OR set Root to `/frontend`.
   - Install command (optional): npm --prefix frontend ci
   - Build command: npm run build
   - Output directory: frontend/build  (or `build` if using root build script)

3) Environment variables
   - Add API URLs and secrets under Project -> Settings -> Environment Variables.

4) Rewrites / SPA
   - We included an SPA rewrite in `vercel.json` that sends all routes to `index.html`. That should fix client-side routing 404s.

5) Trigger a deploy by pushing to the branch linked to the Vercel project.

If you want me to push the repository to `git@github.com:vibgyormaple-code/GRASSHAWK-WEBSITE-TRIAL.git` and create a branch `frontend-deploy`, reply "push and create frontend-deploy" and I'll do it.
