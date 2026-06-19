import bcrypt from 'bcryptjs';
import { randomInt } from 'node:crypto';

type PasswordResetCode = {
  code: string;
  resetCodeHash: string;
  expiresAt: Date;
};

type VerifyPasswordResetCodeInput = {
  enteredCode: string;
  resetCodeHash: string;
  expiresAt: Date;
};

type VerifyPasswordResetCodeExpiredResult = {
  isValid: false;
  reason: 'expired';
};

type VerifyPasswordResetCodeMismatchResult = {
  isValid: false;
  reason: 'mismatch';
};

type VerifyPasswordResetCodeSuccessResult = {
  isValid: true;
};

type VerifyPasswordResetCodeResult =
  | VerifyPasswordResetCodeSuccessResult
  | VerifyPasswordResetCodeExpiredResult
  | VerifyPasswordResetCodeMismatchResult;

const resetCodeLength = 6;
const resetCodeExpiryMinutes = 15;
const bcryptSaltRounds = 10;

export const createPasswordResetCode = async (): Promise<PasswordResetCode> => {
  const code = randomInt(0, 10 ** resetCodeLength)
    .toString()
    .padStart(resetCodeLength, '0');
  const resetCodeHash = await bcrypt.hash(code, bcryptSaltRounds);
  const expiresAt = new Date(Date.now() + resetCodeExpiryMinutes * 60 * 1000);

  return {
    code,
    resetCodeHash,
    expiresAt,
  };
};

export const verifyPasswordResetCode = async ({
  enteredCode,
  resetCodeHash,
  expiresAt,
}: VerifyPasswordResetCodeInput): Promise<VerifyPasswordResetCodeResult> => {
  if (expiresAt.getTime() <= Date.now()) {
    return {
      isValid: false,
      reason: 'expired',
    };
  }

  const isMatch = await bcrypt.compare(enteredCode, resetCodeHash);

  if (!isMatch) {
    return {
      isValid: false,
      reason: 'mismatch',
    };
  }

  return {
    isValid: true,
  };
};
