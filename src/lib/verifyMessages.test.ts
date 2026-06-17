import { describe, it, expect } from 'vitest';
import { messageForVerifyReason } from '@/lib/verifyMessages';

describe('messageForVerifyReason', () => {
  it('returns the expired message for an expired code', () => {
    expect(messageForVerifyReason('expired')).toBe(
      'That code has expired. Please sign up again to get a new code.',
    );
  });

  it('returns the mismatch message for a wrong code', () => {
    expect(messageForVerifyReason('mismatch')).toBe(
      "That code doesn't match. Double-check it and try again.",
    );
  });

  it('returns the already-verified message', () => {
    expect(messageForVerifyReason('already_verified')).toBe(
      'This account is already verified — you can just log in.',
    );
  });

  it('falls back to a generic message for an unknown reason', () => {
    expect(messageForVerifyReason('something_else')).toBe(
      'Something went wrong verifying your code. Please try again.',
    );
  });

  it('falls back to a generic message when reason is undefined', () => {
    expect(messageForVerifyReason(undefined)).toBe(
      'Something went wrong verifying your code. Please try again.',
    );
  });
});