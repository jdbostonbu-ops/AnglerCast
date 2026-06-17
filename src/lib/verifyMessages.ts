const fallbackVerifyMessage = 'Something went wrong verifying your code. Please try again.';

const verifyReasonMessages: Record<string, string> = {
  expired: 'That code has expired. Please sign up again to get a new code.',
  mismatch: "That code doesn't match. Double-check it and try again.",
  already_verified: 'This account is already verified — you can just log in.',
};

export const messageForVerifyReason = (reason: string | undefined): string =>
  reason === undefined ? fallbackVerifyMessage : verifyReasonMessages[reason] ?? fallbackVerifyMessage;
