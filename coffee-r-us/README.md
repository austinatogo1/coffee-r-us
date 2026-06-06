# ☕ Coffee R Us — Admin Portal

A React Single Page Application (SPA) for managing an e-commerce coffee store, built with Vite, React Router, and json-server.

## Features

- **Home Page** — Store landing page with live store info fetched from the backend
- **Shop Page** — Browse all coffees with dynamic search and origin filters
- **Admin Portal** — Add new coffees (POST), update prices (PATCH), delete products (DELETE)
- **Client-Side Routing** — 3 routes (`/`, `/shop`, `/admin`) via React Router v6
- **Custom Hooks** — `useCoffee` (all CRUD operations), `useToast` (notifications)
- **Testing** — Vitest + React Testing Library test suite covering all features


## Setup & Usage

### 1. Install dependencies
```bash
npm install
```

### 2. Run the backend (json-server on port 3001)
```bash
npm run server
```

### 3. Run the frontend (Vite dev server on port 5173)
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 4. Run tests
```bash
npm test
```

---



## Known Limitations

- No authentication on the Admin Portal (any user can access it)
- Images rely on external URLs; broken links fall back to a default image
- json-server resets to `db.json` on restart — changes are not permanently persisted

---

## Built by
austinatogo1
EOF