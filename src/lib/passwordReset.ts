import bcrypt from 'bcryptjs';
import { randomInt } from 'node:crypto';
import { prisma } from '@/lib/prisma';

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

type RequestPasswordResetInput = {
  email: string;
};

type RequestPasswordResetMissingAccountResult = {
  ok: false;
  reason: 'account_not_found';
};

type RequestPasswordResetUnverifiedAccountResult = {
  ok: false;
  reason: 'account_not_verified';
};

type RequestPasswordResetSuccessResult = {
  ok: true;
  code: string;
};

type RequestPasswordResetResult =
  | RequestPasswordResetSuccessResult
  | RequestPasswordResetMissingAccountResult
  | RequestPasswordResetUnverifiedAccountResult;

type ResetPasswordWithCodeInput = {
  email: string;
  enteredCode: string;
  newPassword: string;
};

type ResetPasswordWithCodeFailureResult = {
  ok: false;
  reason: 'expired' | 'mismatch';
};

type ResetPasswordWithCodeSuccessResult = {
  ok: true;
};

type ResetPasswordWithCodeResult =
  | ResetPasswordWithCodeSuccessResult
  | ResetPasswordWithCodeFailureResult;

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

export const requestPasswordReset = async ({
  email,
}: RequestPasswordResetInput): Promise<RequestPasswordResetResult> => {
  const account = await prisma.user.findUnique({
    where: { email },
  });

  if (!account) {
    return {
      ok: false,
      reason: 'account_not_found',
    };
  }

  if (!account.isVerified) {
    return {
      ok: false,
      reason: 'account_not_verified',
    };
  }

  const resetCode = await createPasswordResetCode();

  await prisma.user.update({
    where: { email },
    data: {
      passwordResetCodeHash: resetCode.resetCodeHash,
      passwordResetCodeExpiresAt: resetCode.expiresAt,
    },
  });

  return {
    ok: true,
    code: resetCode.code,
  };
};

export const resetPasswordWithCode = async ({
  email,
  enteredCode,
  newPassword,
}: ResetPasswordWithCodeInput): Promise<ResetPasswordWithCodeResult> => {
  const account = (await prisma.user.findUnique({
    where: { email },
  }))!;

  const verificationResult = await verifyPasswordResetCode({
    enteredCode,
    resetCodeHash: account.passwordResetCodeHash!,
    expiresAt: account.passwordResetCodeExpiresAt!,
  });

  if (!verificationResult.isValid) {
    return {
      ok: false,
      reason: verificationResult.reason,
    };
  }

  const passwordHash = await bcrypt.hash(newPassword, bcryptSaltRounds);

  await prisma.user.update({
    where: { email },
    data: {
      passwordHash,
      passwordResetCodeHash: null,
      passwordResetCodeExpiresAt: null,
    },
  });

  return {
    ok: true,
  };
};
