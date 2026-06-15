Acceptance Criteria — AnglerCast (Must Have features)

Each user story is "accepted" when all of its conditions below are true. These are the observable behaviors a tester can check.


User Story 1 (create account + verify email) — Accepted when:
- A new user can sign up and their account starts inactive.
- A verification code is emailed to them.
- Entering the correct, unexpired code activates the account.
- An expired or wrong code is rejected with a clear message.
- The account can't be used until verified.
- An already-verified account can't be verified again.


User Story 2 (log in) — Accepted when:
- A verified user can log in with the correct email and password.
- A wrong password is rejected with a clear message.
- An unverified user cannot log in, even with the correct password.
- The password field has a show/hide toggle that switches between hidden and visible.
- After a successful login, the user reaches their own account.


User Story 3 (save, view, edit, delete fishing spots) — Accepted when:
- A logged-in user can create a saved spot (name, coordinates, species, water type, notes).
- The saved spot's coordinates are stored at full precision (no rounding).
- The user can see a list of their own saved spots.
- The user only sees their own spots, not anyone else's.
- The user can edit a saved spot and the change persists.
- The user can delete a saved spot.


User Story 4 (delete confirmation) — Accepted when:
- Choosing to delete a saved spot shows a confirmation dialog first.
- The spot is deleted only after the user explicitly confirms.
- Canceling the dialog leaves the spot untouched and closes the dialog.


User Story 5 (data persists — Prisma + Neon) — Accepted when:
- A created account and saved spots are still there after closing and reopening the app (the data persists in the live database).
- Each saved spot is linked to the user who created it.
- The app reads and writes against the live Neon database.
