# Initial Setup: Mapbox & Firebase with Next.js

This guide will help you configure Mapbox and Firebase for local development in this Next.js project.

---

## 1. Environment Variables

Create a `.env.local` file in the root of your project (this file should not be committed to version control).

Add the following variables:

```env
# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_access_token

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

You can find your Firebase config in your Firebase Console under Project Settings.

---

## 2. Install Dependencies

Install the required packages:

```bash
npm install firebase mapbox-gl
```

If you use TypeScript, also install types:

```bash
npm install --save-dev @types/mapbox-gl
```

---

## 3. Firebase Initialization

Firebase is initialized in `lib/firebase.ts`. Make sure it uses the environment variables above. Example:

```ts
// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export default app;
```

---

## 4. Mapbox Usage

When using Mapbox in your components, reference the public token via `process.env.NEXT_PUBLIC_MAPBOX_TOKEN`. Example:

```js
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
```

---

## 5. Next.js Notes

- Always use the `NEXT_PUBLIC_` prefix for environment variables that need to be exposed to the browser.
- Restart your dev server after adding or changing environment variables.

---

## 6. Further Reading

- [Mapbox GL JS Docs](https://docs.mapbox.com/mapbox-gl-js/guides/)
- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

---

**This is a temporary guide. Please update as the project evolves!**
