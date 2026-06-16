# AnglerCast TDD Results

## Add results of RED/GREEN tests below

| Test | RED result | GREEN result | Notes |
|------|------------|--------------|-------|
| 1.1 | RED test written in `src/lib/emailVerification.test.ts`. Expected failure: `@/lib/emailVerification` and `createEmailVerificationCode` do not exist yet. | GREEN: `src/lib/emailVerification.test.ts` passes after adding `createEmailVerificationCode` with a hashed stored code and future expiry. | Checks that the stored verification code is hashed, bcrypt verifies the raw emailed code against the stored hash, and the expiry timestamp is in the future. |
