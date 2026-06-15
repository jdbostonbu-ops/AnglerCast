# AnglerCast TDD Results

## Add results of RED/GREEN tests below

| Test | RED result | GREEN result | Notes |
|------|------------|--------------|-------|
| 1.1 | RED test written in `src/lib/emailVerification.test.ts`. Expected failure: `@/lib/emailVerification` and `createEmailVerificationCode` do not exist yet. | Not run yet; no implementation has been written. | Checks that the stored verification code is hashed, bcrypt verifies the raw emailed code against the stored hash, and the expiry timestamp is in the future. |
