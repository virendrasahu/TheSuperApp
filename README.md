# The Super App

A Vite + React implementation of the frontend challenge. The app includes registration, guarded category onboarding, a modular dashboard, live weather, auto-rotating news, persistent notes, a countdown timer, and movie discovery with detail modals.

## Tech

- React with Vite
- React Router
- Zustand with persisted browser storage
- Custom CSS and reusable components
- Open-Meteo weather API
- Spaceflight News API with fallback articles
- OMDB-compatible movie service with bundled fallback data

## Run Locally

```bash
npm install
npm run dev
```

For OMDB requests, add an optional `.env` value:

```bash
VITE_OMDB_KEY=your_key_here
```

The app still works without that key by using the bundled fallback movie catalog.
