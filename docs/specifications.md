AnglerCast — Specifications

How each Must Have feature is built. Paired with the user stories in my sprint plan. Plain-language description first, then the technical detail under it. Everything is built test-first (TDD), with external calls (Prisma/Neon, email, the APIs, OpenAI) mocked in unit tests.

Data model (the entity the gate checks)

User
- id
- email (unique)
- passwordHash (bcrypt)
- isVerified (boolean, default false)
- verificationCodeHash (string, nullable)
- verificationCodeExpiresAt (datetime, nullable)
- createdAt

SavedSpot (belongs to a User — this is the relationship)
- id
- userId (foreign key → User.id)
- name
- latitude (full precision, never truncated)
- longitude (full precision, never truncated)
- species
- waterType ("freshwater" | "saltwater")
- notes (optional)
- createdAt

Relationship: one User has many SavedSpots; each SavedSpot belongs to one User.


Must Have #1 — Email code verification

What it does: When a new user signs up, the app creates their account as inactive, generates a verification code, stores it hashed with an expiry, and emails it. The user enters the code to activate the account. The account cannot be used until the correct, unexpired code is entered.

Technical detail:
- Sign-up route handler: export async function POST() — creates the User with isVerified false, bcrypt-hashes the password, generates a random code, stores its hash + an expiry timestamp (e.g. 15 minutes out), and triggers the email send via Resend.
- Verify route handler: export async function POST() — takes the email + entered code, compares the hash, checks it has not expired, and on success sets isVerified true and clears the code fields.
- Code generation / hashing / expiry / verification are pure, tested seams (closure-based arrow functions assigned to const). Email send and DB are mocked in unit tests.
- Validation: reject an expired code, a wrong code, and an already-verified account, each with a clear message.


Must Have #2 — Login

What it does: A returning user logs in with email and password. The password field has a show/hide ("private eye") toggle. Wrong credentials are rejected.

Technical detail:
- Login route handler: export async function POST() — looks up the user by email, bcrypt-compares the entered password to passwordHash, and rejects if the user is not verified or the password is wrong.
- Session/auth token established on success (per chosen approach).
- The show/hide toggle is client-side state on the password input (a client component).
- Tested seams: the credential-check function (correct password passes, wrong password fails, unverified user blocked). Mocked DB.


Must Have #3 — CRUD for SavedSpot

What it does: A logged-in user can create a fishing spot and see their saved spots (Create + Read — the gate's core requirement), plus update them. Coordinates are stored at full precision.

Technical detail:
- Route handlers for SavedSpot: export async function POST() (create), GET() (read the logged-in user's spots), PATCH() (update).
- Each handler checks the user is authenticated and only touches that user's spots (scoped by userId).
- Coordinates are stored exactly as entered — no toFixed, no rounding.
- Tested seams: the create/read/update logic with Prisma mocked; a test proves a full-precision coordinate round-trips unchanged.


Must Have #4 — Delete confirmation dialog

What it does: Deleting a saved spot shows a confirmation dialog first. The spot is only deleted after the user explicitly confirms; canceling leaves it untouched.

Technical detail:
- Delete route handler: export async function DELETE() — removes the spot, scoped to the logged-in user.
- A confirmation dialog component (client component) gates the delete call: the DELETE request only fires on explicit confirm; cancel closes the dialog and does nothing.
- Tested: the dialog's confirm handler calls delete; the cancel handler does not.


Must Have #5 — Prisma + Neon live database

What it does: The app connects to a live PostgreSQL database on Neon through Prisma, so accounts and saved spots persist between visits.

Technical detail:
- Prisma schema defines User and SavedSpot with the relationship above.
- Migrate the schema to Neon.
- The Neon connection string lives in .env (never committed).
- Unit tests mock Prisma; a separate live check confirms a real read/write against Neon succeeds (the migration ran and a row can be created and read back).


Cross-cutting rules (apply to all of the above)
- Built test-first: failing test (RED) before implementation (GREEN), no test weakened to pass, every cycle recorded in TESTING.md.
- Strict TypeScript (no any), no var, closure-based arrow functions assigned to const, factory functions over classes — except Next.js route handlers, which use export async function GET/POST/PATCH/DELETE().
- Coordinates always full precision.
- Secrets (OPENAI_API_KEY, Neon connection string) in .env, not committed.
