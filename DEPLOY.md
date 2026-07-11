# ITSI | Automated Irrigation Environment Deployment Guide

This guide provides instructions on how to deploy your ITSI Smart Irrigation application to **Vercel** and **GitHub Pages**. All necessary files have been pre-configured for you in the repository root.

---

## 🚀 1. Deploying to Vercel (Recommended)

Vercel provides native out-of-the-box support for Vite Single Page Applications (SPAs).

### pre-configured: `vercel.json`
To prevent `404 Not Found` errors when refreshing custom pages (such as `/about`, `/login`, or `/contact`), a rewrite rule has been created at the root (`/vercel.json`):
```json
{
  "version": 2,
  "cleanUrls": true,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Steps to Deploy:
1. **Push your code to a GitHub repository**.
2. **Sign in to Vercel** ([vercel.com](https://vercel.com/)).
3. Click **Add New** > **Project** and import your GitHub repository.
4. **Environment Variables**:
   Under the *Environment Variables* section, add your secret keys if you have configured them (from your `.env.example` file):
   * `VITE_SUPABASE_URL` (Your Supabase project URL)
   * `VITE_SUPABASE_ANON_KEY` (Your Supabase public anon key)
5. Click **Deploy**. Vercel will automatically build the React code and serve it with clean router path routing.

---

## 🐙 2. Deploying to GitHub Pages

GitHub Pages serves static files. To handle React's dynamic `BrowserRouter` cleanly, we have implemented the robust SPA routing redirection mechanism.

### pre-configured:
1. `/public/404.html`: Redirects custom route requests back to the entry point `index.html` with query parameters.
2. `/index.html`: Contains a header script that decodes the path and smoothly restores the clean URL path before React boots up.
3. `/.github/workflows/deploy.yml`: A fully automated GitHub Actions workflow to compile and deploy your code.

### Option A: Fully Automated Deployment (Recommended)
We have added a custom GitHub Actions workflow (`deploy.yml`) that automatically builds and deploys your site whenever you push changes to your `main` or `master` branch.

#### Steps:
1. Go to your repository settings on GitHub.
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, make sure it is set to **Deploy from a branch**.
4. Push your code to your GitHub `main` or `master` branch.
5. The GitHub Actions workflow will execute automatically, build your project using the correct sub-directory path (`VITE_BASE_URL`), and push the build files to the `gh-pages` branch.
6. Return to **Settings** > **Pages** and change the deployment branch to **`gh-pages`** (folder `/root`).

### Option B: Manual Static Deployment
If you prefer to build and deploy manually:
1. Run the production build command by passing your repository name as the base directory:
   ```bash
   VITE_BASE_URL="/<your-repository-name>/" npm run build
   ```
2. Upload the contents of the generated `dist/` directory directly to your static server or push them to a `gh-pages` branch.

---

## 🔒 3. Supabase Integration Setup
To sync form submissions and system orders directly to your real-time PostgreSQL database:
1. Create a free account at [Supabase](https://supabase.com/).
2. Create two SQL tables using the following schemas:

#### `contact_submissions` table:
```sql
create table contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text not null,
  subject text,
  message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

#### `product_reservations` table:
```sql
create table product_reservations (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  package_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

3. Enable Row Level Security (RLS) or add standard Insert permissions to these tables as needed.
4. Copy your **Supabase Project URL** and **Anon API Key** from the Supabase dashboard and insert them into your hosting provider's environment settings.
