# Birthday Quest

A Vite + React interactive birthday site, with an admin dashboard for viewing photos
visitors capture during the Gift Quest.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your Firebase config, see below
npm run dev                  # visitor site
VITE_APP_TARGET=admin npm run dev   # admin dashboard, on the same port
```

## One-time Firebase setup

1. Go to the [Firebase console](https://console.firebase.google.com/) → create a project.
2. **Authentication** → Sign-in method → enable **Email/Password**. Then Users → Add user →
   create the one admin account (your own email + a password). There is no signup page on
   the site itself — this is the only way an admin account gets created.
3. **Firestore Database** → Create database (production mode). Rules tab → paste the
   contents of [`firestore.rules`](firestore.rules) → Publish.
4. Project settings → General → Your apps → Add app → Web. Copy the config values into
   `VITE_FIREBASE_*` in your `.env.local` (and into Vercel, see below).

No Firebase Storage setup needed — photos (Gift Quest + the Locket-style moments
widget) are compressed client-side and stored directly as Firestore document fields
instead (see `src/utils/resizeImage.js` / `compressImage.js`), since Storage now
requires the paid Blaze plan just to create a bucket. `storage.rules` is unused and
only kept around in case you switch back to real Storage later.

## Deploying to two domains on Vercel

Because this is a static SPA (no server-side routing), the visitor site and the admin
dashboard are two separate Vercel projects built from the same repo, split by one
build-time env var:

1. Push this repo to GitHub.
2. In Vercel, **Add New Project** twice, importing the same GitHub repo both times.
3. Name one project e.g. `birthday-site` — leave `VITE_APP_TARGET` unset. Attach your
   visitor domain (`abc.com`) to it under Settings → Domains.
4. Name the other e.g. `birthday-admin` — add the environment variable
   `VITE_APP_TARGET=admin`. Attach your admin domain (`abc-admin.com`) to it.
5. On **both** projects, add the six `VITE_FIREBASE_*` environment variables from your
   `.env.local`.
6. Redeploy both projects after adding env vars (Vercel only picks them up on a new build).

## Caching

- The visitor site registers a service worker (`vite-plugin-pwa`) that caches its own
  assets for instant repeat loads and basic offline use. The admin dashboard opts out of
  this so it always shows live data.
- Uploaded photos live inline in Firestore (see above), so there's no separate CDN/cache
  header to configure for them.
