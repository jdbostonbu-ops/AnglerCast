<p align="center">
  <img src="fishing.png" width="400" />
</p>

<div align="center">

# 🎣 AnglerCast

**Know what fish are where — and when — from real public occurrence data.**

_Fish move constantly. AnglerCast shows you the historical sighting record from real public data — with honest sample sizes and confidence, never a guarantee._

<br/>

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Neon Postgres](https://img.shields.io/badge/Neon_Postgres-008C2F?style=for-the-badge&logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)

![Built test-first](https://img.shields.io/badge/built-test--first_(TDD)-cf922c?style=for-the-badge)
![Tests](https://img.shields.io/badge/tests-122_passing-2D9E4F?style=for-the-badge&logo=vitest&logoColor=white)
![GitHub stars](https://img.shields.io/github/stars/jdbostonbu-ops/AnglerCast?style=for-the-badge&logo=github&color=e2a83b)

**[🌐 Live Site](https://anglercast.fyi)**
</div>

---

[👤 Author's Profile](https://github.com/jdbostonbu-ops)

---

## 📖 About

**AnglerCast** is a web app with its own domain for fishermen planning a trip who want to know where and when fish *can* be — not where they're guaranteed to be. Fish are always moving, but anglers and researchers leave a trail of where fish have actually been recorded. AnglerCast turns that real public occurrence data into honest, plain-English guidance.

It's split into **Freshwater** and **Saltwater** views, each with a map of real recorded occurrences, an honest historical sighting rate, and an AI that *explains* the numbers — it never invents them. A separate **Explore** page provides a conditions-aware travel-time tool.

---

## 🧭 The Honest-Data Thesis

This is the principle the whole app is built around, and it is never violated:

> **Real data computes the facts. The AI explains and assembles — it does not invent.**

- 📌 Locations, fish, months, sighting frequency, sample sizes, and confidence flags are produced by **tested code** from real occurrence data (GBIF and OBIS).
- 🗣️ The AI (OpenAI) only *phrases* recommendations from facts the code already computed. It **never** invents a location, a species, or a season.
- 📊 Every rate or recommendation is shown with its **sample size** and a **high/low confidence flag**.
- 🚫 There is **never** a fabricated "catch probability." The app shows where fish *have been recorded* — never a guarantee of where they are now.
- 🧮 **One intentional exception:** the conditions-aware travel-time / ETA, where the AI computes an estimate from inputs the code provides (origin, destination, conditions, speed) — guarded by a sanity-check test that rejects an impossible ETA.

---

## 🧪 Test-Driven Development

AnglerCast was built test-first. Most features followed the same disciplined cycle:

```
1. 🔴 RED    →  Write a failing test first. Run it. Confirm it fails for the
                 expected reason (missing implementation), not a typo.
2. 💾 commit →  Commit the RED on its own.
3. 🟢 GREEN  →  Write the simplest code that makes that one test pass. Re-run.
4. 💾 commit →  Commit the GREEN separately.
5. 🔁 repeat →  One test at a time. Never weaken or delete a test to pass.
```

> Test-first, provable. AnglerCast was built test-first. For most features, the failing test (RED) was committed before its implementation (GREEN) as a separate commit — so the discipline is verifiable in git history, not just claimed. You can check out any RED commit and run the test to watch it fail because the implementation doesn't exist yet. For example, at commit 604735b the OBIS fetch test imports a module that hasn't been written, so the suite fails to resolve it — RED by construction. A few early features were committed in batches rather than separate RED/GREEN steps; for those, the red-first cycle is recorded in RESULTS.md. The full sequence of RED commits is visible by filtering the log: git log --oneline | grep "test:".

The rules that kept it honest:

- 🧱 **Test-first, always.** No implementation exists before a failing test does.
- 🔒 **External calls are mocked in every unit test** — GBIF, OBIS, NOAA, Open-Meteo, USGS, OpenAI, Prisma/Neon, and Resend email. Unit tests never hit the real network or database.
- 🧩 **Pure, tested seams.** Core logic lives in small closure-based functions (e.g. `computeSightingRate`, `verifyEmailVerificationCode`, `checkLoginCredentials`) that are tested directly. Route handlers wire those seams together; UI is eyeball-verified on top of green logic.
- 📒 **Two ledgers.** Every cycle is recorded in [`TESTING.md`](./TESTING.md) (the RED plan) and [`RESULTS.md`](./RESULTS.md) (the RED → GREEN outcomes).
- ✅ **The result:** a full Vitest suite of **122 passing** unit, component, and integration tests across 48 files, with a clean `typecheck`.

> Strict TypeScript throughout — **no `any`**, no `var`, closure-based arrow functions, factory functions over classes (except Next.js route handlers).

---

## ✨ Features

Built in this order, each test-first:

- [x] 📧 **Email code verification** — hashed, expiring code, required before an account is active
- [x] 🔐 **Login** — bcrypt password check + show/hide password toggle
- [x] 📍 **CRUD for saved spots** — create, read, update, delete fishing locations
- [x] 🗑️ **Delete confirmation dialog** — no accidental deletes
- [x] 🗄️ **Prisma + Neon live database** — accounts and spots persist
- [x] 🎯 **Coordinate precision fix** — full decimal precision, never truncated
- [x] 🧭 **Nav bar** — Freshwater · Saltwater · Explore · Contact, with logout
- [x] 🏠 **Post-login home** — two-button entry to Fresh / Salt
- [x] 🛬 **Landing page** — rugged outdoor feel
- [x] 🎣 **Recommendation feature** — real fish + real location + best month, AI-phrased
- [x] 🐟 **Distinct map markers per species** — with a legend
- [x] ⛵ **Knots / ETA travel time** — conditions-aware, sanity-checked
- [x] 📊 **Empirical sighting-rate search** — honest historical rate + map

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js (App Router) + React + TypeScript |
| **Backend** | Next.js API route handlers |
| **Database** | PostgreSQL on **Neon**, via **Prisma** ORM |
| **Auth** | bcrypt-hashed passwords + email code verification + session cookie |
| **Email** | **Resend** (transactional, from a verified domain) |
| **AI** | **OpenAI** `gpt-4o-mini` — explanation / assembly + travel-time |
| **Maps** | **Leaflet** (client-side, full-precision markers) |
| **Testing** | **Vitest** — unit, component, integration; external calls mocked |
| **Deployment** | **Vercel** (app) + **Neon** (database) |

---

## 🔌 Data Sources & APIs

Every fact comes from a real source. The AI explains and assembles; it does not invent.

| Source | Key | Role |
|---|---|---|
| **GBIF Occurrence** (Global Biodiversity Information Facility) | keyless | Historical species occurrences worldwide (primary) |
| **OBIS Occurrence** (Ocean Biodiversity Information System) | keyless | Marine occurrence records (Darwin Core), merged with GBIF |
| **Open-Meteo Marine** | keyless | Saltwater / ocean conditions (waves, swell, currents) |
| **Open-Meteo Forecast** | keyless | Wind and weather conditions (both water types) |
| **USGS** (U.S. Geological Survey) | keyless | Live water conditions (streamflow, gage height, water temperature) near the location |
| **NOAA CO-OPS** (National Oceanic and Atmospheric Administration, Center for Operational Oceanographic Products and Services) | keyless | High and low tide predictions for the nearest coastal station (saltwater) |
| **OpenAI** `gpt-4o-mini` | key | Explains conditions and phrases the ETA, species, and tide summaries in plain English |

---

## 🧠 The AI Layer (OpenAI)

The AI is strictly an **explanation and assembly** layer, powered by `gpt-4o-mini`. It receives the **already-computed** rate, sample size, and confidence and turns them into clear, plain-English guidance for the angler. It is explicitly told the numbers — it never calculates them, and it never invents a location, species, or season. The single computational exception is the conditions-aware travel-time estimate, which is guarded by a sanity-check test.

---

## Try these on the Explore page:

Off Fort Lauderdale (Atlantic): 26.1000, -80.0500
Off Key West (Atlantic side): 24.5000, -81.8000
Gulf of Mexico, off Tampa: 27.7000, -83.0000
Off Naples (Gulf): 26.1000, -81.9000

---

## 🗄️ Database — Neon Postgres + Prisma

Accounts and saved spots live in a real **PostgreSQL** database on **Neon** (serverless, accessed over a pooled connection in production), through the **Prisma** ORM.

```
User  ──< has many >──  SavedSpot
```

- **User** — `id`, `email` (unique), `passwordHash`, `isVerified`, `verificationCodeHash`, `verificationCodeExpiresAt`, `createdAt`
- **SavedSpot** — `id`, `userId` (FK → User), `name`, `latitude`, `longitude` *(full precision)*, `species`, `waterType`, `notes?`, `createdAt`

Each saved spot belongs to exactly one user, and a user only ever sees their own spots (every query is scoped by `userId`). Unit tests mock Prisma; a separate live check confirms a real read/write against Neon.

---

## 🔐 Authentication & Login

- 🔑 Passwords are **bcrypt-hashed** — never stored in plain text.
- 👁️ The login form has a **show/hide password toggle**.
- ✅ Only **verified** users can log in — an unverified account is blocked even with the correct password; a wrong password is rejected with a clear message.
- 🍪 A session cookie keeps you signed in, and **Log out** is available on every page; logging out returns you to the login page.

---

## 📧 Email Verification (Resend)

New accounts start **inactive** and must verify a one-time code before they can be used. The flow:

```
1. ✍️  Sign up          → account created with isVerified = false; password bcrypt-hashed
2. 🔢  Generate code    → a random code is stored HASHED, with a future expiry timestamp
3. 📨  Send via Resend  → the code is emailed from a verified @anglercast.fyi sender
4. ⌨️  Enter the code   → on the /verify page
5. ✅  Activate         → correct & unexpired code flips isVerified = true and clears the code
6. 🚫  Guarded          → expired / wrong codes are rejected clearly; a verified account
                           cannot be verified again
```

> The code-generation, hashing, expiry, and verification are all pure tested seams. The email send is mocked in unit tests, so the suite never sends a real email.

---

## 📍 Save a Spot

A logged-in angler can save the places they care about:

- ➕ **Create** a spot with a name, coordinates, species, water type, and optional notes.
- 📋 **Read** — see a list of *your own* saved spots (and only yours).
- ✏️ **Update** — No updates on the cards
- 🗑️ **Delete** — behind a confirmation dialog (below).

Coordinates are stored exactly as entered — **at full precision, never rounded.**

### 🗑️ Delete Confirmation Dialog

Deleting a spot opens a confirmation dialog first. The spot is removed **only** after you explicitly confirm; canceling closes the dialog and leaves the spot untouched. _(Tested: confirm fires the delete handler exactly once; cancel fires nothing.)_

---

## 🗺️ The Interactive Map

Built with **Leaflet**, the map renders the real recorded occurrences for a search.

### 🐟 Distinct species pins

Each species maps to its own **distinct marker style**, with a **legend** so you can tell them apart at a glance.

### 🎯 Full-precision coordinates

The coordinate rule is critical and enforced everywhere:

- 📐 Latitude and longitude are preserved at **full decimal precision** — no `toFixed`, no rounding, for storage, transport, queries, or display.
- ⚠️ Rounding a coordinate moves the point miles off and is unsafe — so it's never done. A dedicated test proves a full-precision coordinate survives input → query **unchanged**.
- 🗺️ The map is centered on the searched coordinates so it always matches the search, and records at `0,0` (Null Island) are excluded so no marker ever lands in the ocean by mistake.

---

## 📊 Empirical Sighting Rate

Pick a species, enter a full-precision latitude/longitude, and choose a month. AnglerCast queries the real occurrence records near those coordinates (GBIF + OBIS) and computes an **honest historical sighting rate**:

```
sighting rate  =  matching-month records ÷ total nearby records
```

It's always shown with:

- 🔢 the **sample size** (total records that back the rate), and
- 🚦 a **high / low confidence flag** based on how many records there are.

> This is a **historical sighting rate, never a fabricated "catch probability."** The AI explains the number; the code computes it.

---

## ⛵ Travel Time (Explore)

The **Explore** page is a conditions-aware travel-time tool. A fisherman enters their **origin** coordinates, their **destination** coordinates (the fishing spot), their **boat speed in knots**, and the **water type**. AnglerCast then:

- 📐 computes the distance from the full-precision coordinates (haversine, in nautical miles),
- 🌊 fetches real conditions at the destination — **Open-Meteo Marine + Forecast** for saltwater, **USGS + Open-Meteo Forecast** for freshwater,
- 🧠 asks the AI to estimate a conditions-aware **ETA** and explain the conditions in plain English, and
- 🚦 guards the AI's number with a **sanity check** that rejects an impossible ETA.

The result shows the ETA, the distance, the AI's explanation, and the raw conditions it was computed from — so you always see what the estimate is based on.

---

## 🔄 Live Weekly Updates

The home page's "Top recorded spots this season" cards are computed **live from real GBIF + OBIS occurrence records** — each card surfaces the dominant month, the rate, the sample size, and a confidence flag, and the data is **refreshed weekly**. Nothing is hard-coded or invented.

---

## 🌐 Domain & Deployment

- ☁️ Deployed on **Vercel**, with the production build regenerating the Prisma client on every deploy.
- 🌍 Live on a custom domain — **[anglercast.fyi](https://anglercast.fyi)** — with DNS managed in Cloudflare (A + CNAME records, SSL issued automatically).
- 📧 The domain is **verified with Resend** (DKIM / SPF / DMARC), so verification emails deliver to real users from `@anglercast.fyi`.

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/jdbostonbu-ops/AnglerCast.git
cd AnglerCast

# 2. Install dependencies
npm install

# 3. Configure environment variables (.env)
#    DATABASE_URL      Neon Postgres pooled connection string
#    RESEND_API_KEY    Resend API key
#    EMAIL_FROM        verified sender, e.g. verify@anglercast.fyi
#    OPENAI_API_KEY    OpenAI key

# 4. Set up the database
npx prisma migrate dev

# 5. Run the dev server
npm run dev
```

Run the test suite:

```bash
npx vitest run
```

### 🔑 Environment Variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL **pooled** connection string |
| `RESEND_API_KEY` | Resend API key for sending verification emails |
| `EMAIL_FROM` | Verified sender address (e.g. `verify@anglercast.fyi`) |
| `OPENAI_API_KEY` | OpenAI key for explanations + travel-time |

> Secrets live in `.env` (never committed) and are re-entered in Vercel's project settings for production.

---

## 📖 A snapshot at TDD Testing Before and After

<p align="center">
  <img src="TDD failed test.png" width="800" />
</p>

<p align="center">
  <img src="TDD passed test.png" width="800" />
</p>

---

## 💬 Feedback

Tried AnglerCast out on the water (or at your desk)? I'd genuinely love to hear what worked and what didn't.

### 👉 **[Leave feedback via this short Tally form](https://tally.so/r/YOUR_TALLY_FORM_ID)**

---

## 👤 Author

**Jacqueline Delgado**

🔗 **Repository:** [github.com/jdbostonbu-ops/AnglerCast](https://github.com/jdbostonbu-ops/AnglerCast)
🌐 **Live site:** [anglercast.fyi](https://anglercast.fyi)

---

## ⭐ Star This Repo

If AnglerCast is useful to you — or you just appreciate honest-data engineering and a fully test-first build — **please give it a star.** It genuinely helps. 🎣

### ⭐ **[Star AnglerCast on GitHub](https://github.com/jdbostonbu-ops/AnglerCast)** ⭐

<div align="center">

_Fish move constantly. AnglerCast just shows you the honest record._

</div>
