# Vellox CMS

The CMS is the admin panel at **https://www.velloxstudio.com/admin**. Use it to add and edit portfolio projects and upload their images. It runs [Sveltia CMS](https://github.com/sveltia/sveltia-cms).

## How it works

1. You sign in at `/admin` and edit a project.
2. When you save, the CMS commits the change to the GitHub repository (`bhamalawi-alt/vellox-website`, branch `main`).
3. Cloudflare Pages sees the commit, rebuilds the site, and the change is live in about 1–2 minutes.

Each project is one file in `src/content/projects/`. The file name is the page URL: `aurelia-wellness.json` is shown at `/portfolio/aurelia-wellness`. Uploaded images go to `public/uploads/projects/` and are converted to WebP automatically.

## One-time setup

### 1. Make sure the CMS points at the production branch

`public/admin/config.yml` saves to the branch `main`. Cloudflare Pages must deploy `main` to production. If your production branch has another name, change `branch:` in the config.

The CMS can only edit files that exist on that branch, so merge `redesign/ui-libraries` into `main` before you start using it.

### 2. Hide `/admin` behind a login (Cloudflare Access)

This makes the admin invisible to visitors: anyone who opens `/admin` sees a Cloudflare sign-in page, and only the emails you allow can get through.

1. Open the Cloudflare dashboard and go to **Zero Trust**. The free plan covers up to 50 users.
2. Go to **Access → Applications → Add an application → Self-hosted**.
3. Application name: `Vellox CMS`. Session duration: 24 hours (or what you prefer).
4. Add the public hostname `www.velloxstudio.com` with path `admin`. Add a second one for `velloxstudio.com` with path `admin`. If you use the `*.pages.dev` preview address, add it too (path `admin`).
5. Add a policy: Action **Allow**, rule **Emails**, and enter your email address (and any team members').
6. Under login methods, keep **One-time PIN**. Cloudflare will email you a code when you sign in.
7. Save. Open `https://www.velloxstudio.com/admin` in a private window: you should see the Cloudflare login, not the CMS.

### 3. Connect the CMS to GitHub

The CMS needs permission to commit to the repository. The simplest way is a personal access token:

1. On GitHub, go to **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. Repository access: **Only select repositories** → `vellox-website`.
3. Permissions: **Contents: Read and write**. (Metadata: Read-only is added automatically.)
4. Set an expiry date, generate it, and copy the token.
5. Open `/admin`, choose **Sign In Using Access Token**, and paste the token. The browser remembers it, so you only do this once per device.

Never share the token or paste it anywhere else. If it leaks, delete it on GitHub and make a new one.

To use the **Sign In with GitHub** button instead (no token to copy), you need a small authentication worker. See [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth): deploy it to Cloudflare Workers, then add `base_url: https://<your-worker>.workers.dev` under `backend:` in `public/admin/config.yml`.

## Adding a project

1. Open `/admin` → **Projects** → **New Project**.
2. Fill in the title, industry, summary, and services delivered.
3. Add a **cover image** (landscape, 16:9 or 4:3 works best) and its description.
4. Optionally add the project story (leave a blank line between paragraphs), results such as `+28%` / `conversion rate`, gallery photos, and the live site URL.
5. Turn on **Show on home page** if it should appear on the home page.
6. **Order** sets the position: lower numbers show first.
7. Save. The site updates in about 1–2 minutes.

To hide a project without deleting it, turn off **Published**.

Gallery photos from all projects also fill the portfolio page gallery. Until there are 12, the rest of the tiles stay as branded placeholders.

## Editing on your computer (optional)

With the dev server running (`bun --bun next dev`), open **http://localhost:3000/admin/index.html** in Chrome or Edge, choose **Work with Local Repository**, and select the `vellox-website` folder. Changes are saved to your local files instead of GitHub, so you can preview them at `http://localhost:3000/portfolio` before you commit and push.

## Upgrading Sveltia CMS

The version is pinned in `public/admin/index.html` (`@sveltia/cms@0.233.1`). To upgrade, change the version number, test locally, then deploy.
