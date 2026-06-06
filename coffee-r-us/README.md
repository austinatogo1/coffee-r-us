# ☕ Coffee R Us — Admin Portal

A React Single Page Application (SPA) for managing an e-commerce coffee store, built with Vite, React Router, and json-server.

## Screenshot

> *(Take a screenshot of your running app and replace this line with: `![App Screenshot](screenshot.png)`)*

---

## Features

- **Home Page** — Store landing page with live store info fetched from the backend
- **Shop Page** — Browse all coffees with dynamic search and origin filters
- **Admin Portal** — Add new coffees (POST), update prices (PATCH), delete products (DELETE)
- **Client-Side Routing** — 3 routes (`/`, `/shop`, `/admin`) via React Router v6
- **Custom Hooks** — `useCoffee` (all CRUD operations), `useToast` (notifications)
- **Testing** — Vitest + React Testing Library test suite covering all features

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Vite | Build tool & dev server |
| json-server | Simulated REST backend |
| Vitest | Unit testing |
| React Testing Library | Component testing |

---

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

## Project Structure

```
src/
├── components/
│   ├── App.jsx           # Root — defines routes
│   ├── Navbar.jsx        # Navigation bar
│   ├── HomePage.jsx      # / route — landing page
│   ├── ShopPage.jsx      # /shop route — product listing
│   ├── AdminPage.jsx     # /admin route — CRUD portal
│   ├── AddCoffeeForm.jsx # Form to add a new coffee
│   └── ProductCard.jsx   # Single product display card
├── hooks/
│   ├── useCoffee.js      # Custom hook — all CRUD + state
│   └── useToast.js       # Custom hook — toast notifications
├── tests/
│   ├── setup.js
│   ├── Navbar.test.jsx
│   ├── ProductCard.test.jsx
│   ├── AddCoffeeForm.test.jsx
│   └── useCoffee.test.jsx
├── main.jsx
└── index.css
db.json                   # Simulated backend data
```

---

## API Endpoints (json-server)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/coffee` | Fetch all coffees |
| POST | `/coffee` | Add a new coffee |
| PATCH | `/coffee/:id` | Update a coffee (e.g. price) |
| DELETE | `/coffee/:id` | Delete a coffee |
| GET | `/store_info` | Fetch store details |

---

## Known Limitations

- No authentication on the Admin Portal (any user can access it)
- Images rely on external URLs; broken links fall back to a default image
- json-server resets to `db.json` on restart — changes are not permanently persisted

---

## Git Workflow

```bash
# Create a feature branch
git checkout -b feature/add-shop-page

# After changes
git add .
git commit -m "feat: add shop page with search and filter"
git push origin feature/add-shop-page

# Open PR on GitHub → merge to main → delete branch
git checkout main
git pull origin main
git branch -d feature/add-shop-page
```