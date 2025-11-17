Deployment guide — frontend (Vercel) and backend (Railway)

This repository contains a monorepo-style project with the frontend in `frontend/` and backend services in `Backend/`, `order-management-backend/`, and `stripe-backend/`.

Goal for now: deploy the frontend to Vercel. Backend deployment (Railway) is a separate step.

Quick checklist (recommended)
- Ensure `frontend/package.json` has build scripts (it does: `npm run build`).
- Keep `vercel.json` at the repo root (present) or in `frontend/` — Vercel picks root config first.
- Use SSH for pushes (recommended) or a Personal Access Token for HTTPS if needed.

If you want me to push this repo to the GitHub repository `https://github.com/vibgyormaple-code/GRASSHAWK-WEBSITE-TRIAL`, reply "push to new remote" and I'll update the remote and push the current `main` branch or create a `frontend-deploy` branch.

Vercel (frontend) — recommended steps
1. On Vercel dashboard, create a new Project and link the GitHub repository `vibgyormaple-code/GRASSHAWK-WEBSITE-TRIAL` (or the repo you already have).
2. In Project Settings -> Git, set the Root Directory to `/` (if using root `vercel.json`) or to `/frontend` (if you prefer). We already set a root `package.json` and a root `vercel.json` that call `frontend` build steps. Either works — root config is present.
3. Ensure Build & Output Settings (if needed):
   - Framework Preset: Other (or React/Static if detected)
   - Install Command: (leave default) or set to: npm --prefix frontend ci
   - Build Command: npm run build
   - Output Directory: frontend/build  (or `build` if you use the root scripts that run `npm --prefix frontend run build`)
4. Add environment variables (if required) in Vercel: e.g., REACT_APP_API_URL, etc.
5. Deploy — Vercel will run the install/build and provide a production URL.

Notes to avoid common CI errors
- Remove any `file:` dependencies from `package.json` (done for `stripe-backend`).
- Avoid committing `package-lock.json` if those lockfiles are corrupted in the repo — we removed problematic ones.
- If Vercel still attempts to install backend packages, set `Install Command` to `npm --prefix frontend ci` in Project Settings.

Railway (backend) — short notes for later
1. Create a Railway project and connect its Git repository to the relevant backend folder or a dedicated backend repo.
2. Add environment variables (DB URL, STRIPE_SECRET, JWT secret, etc.) in Railway project settings.
3. Set start command, e.g., `node server.js` and set the port via `PORT` env var.

Commands you can run locally
- Create a frontend-only branch (safe):
  git checkout -b frontend-deploy
  git push -u origin frontend-deploy

- Change remote to the GRASSHAWK repo (if you created it) and push:
  git remote set-url origin git@github.com:vibgyormaple-code/GRASSHAWK-WEBSITE-TRIAL.git
  git push -u origin main

If you want me to set the remote and push the current branch for you, reply: "yes push to GRASSHAWK repo".

If you want me to only push the `frontend` folder as a new repository (separate repo) I can also create a `frontend-only` branch and push that.
