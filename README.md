# Ambideckstrous

It's currently a REST api service that is still very limited but will function something like Scryfall.
(This isn't supposed to be for any monetary gain or competition or anything. I'm just doing this to learn)

This is basically a MTG card search app in its current state.
I will eventually add deck building features into it.

## Project structure

This is an npm-workspaces monorepo with two packages:

```
.
├── backend/    # Express + MongoDB REST API (TypeScript)
└── frontend/   # React app scaffolded with Vite (TypeScript)
```

See `backend/README.md` (Dockerfile, `.env.example`, scripts) and `frontend/README.md` for
package-specific details.

## Getting started

Install everything from the repo root — npm workspaces will link both packages:

```bash
npm install
```

Copy the backend's env file and fill in your Mongo connection details:

```bash
cp backend/.env.example backend/.env
```

Run both apps at once in dev mode:

```bash
npm run dev
```

Or run them individually:

```bash
npm run dev:backend
npm run dev:frontend
```

Other useful root scripts:

```bash
npm run build       # builds backend (tsc) and frontend (tsc -b && vite build)
npm run test        # runs backend's mocha suite
npm run typecheck   # type-checks both packages without emitting
```
