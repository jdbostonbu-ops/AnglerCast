import bcrypt from 'bcryptjs';
import { randomInt } from 'node:crypto';
import type { User } from '@prisma/client';
import { prisma } from '@/lib/prisma';

type EmailVerificationCode = {
  code: string;
  verificationCodeHash: string;
  expiresAt: Date;
};

type VerifyEmailVerificationCodeInput = {
  enteredCode: string;
  verificationCodeHash: string;
  expiresAt: Date;
};

type VerifyEmailVerificationCodeExpiredResult = {
  isVerified: false;
  reason: 'expired';
};

type VerifyEmailVerificationCodeMismatchResult = {
  isVerified: false;
  reason: 'mismatch';
};

type VerifyEmailVerificationCodeAndActivateAccountInput = {
  email: string;
  enteredCode: string;
};

type VerifyEmailVerificationCodeMissingAccountResult = {
  isVerified: false;
  reason: 'account_not_found';
};

type VerifyEmailVerificationCodeMissingCodeResult = {
  isVerified: false;
  reason: 'missing_verification_code';
};

type VerifyEmailVerificationCodeAlreadyVerifiedResult = {
  isVerified: false;
  reason: 'already_verified';
};

type VerifyEmailVerificationCodeAndActivateAccountResult =
  | User
  | VerifyEmailVerificationCodeExpiredResult
  | VerifyEmailVerificationCodeMismatchResult
  | VerifyEmailVerificationCodeMissingAccountResult
  | VerifyEmailVerificationCodeMissingCodeResult
  | VerifyEmailVerificationCodeAlreadyVerifiedResult;

const verificationCodeLength = 6;
const verificationCodeExpiryMinutes = 15;
const bcryptSaltRounds = 10;

export const createEmailVerificationCode = async (): Promise<EmailVerificationCode> => {
  const code = randomInt(0, 10 ** verificationCodeLength)
    .toString()
    .padStart(verificationCodeLength, '0');
  const verificationCodeHash = await bcrypt.hash(code, bcryptSaltRounds);
  const expiresAt = new Date(Date.now() + verificationCodeExpiryMinutes * 60 * 1000);

  return {
    code,
    verificationCodeHash,
    expiresAt,
  };
};

export const verifyEmailVerificationCode = async ({
  enteredCode,
  verificationCodeHash,
  expiresAt,
}: VerifyEmailVerificationCodeInput): Promise<
  boolean | VerifyEmailVerificationCodeExpiredResult | VerifyEmailVerificationCodeMismatchResult
> => {
  if (expiresAt.getTime() <= Date.now()) {
    return {
      isVerified: false,
      reason: 'expired',
    };
  }

  const isMatch = await bcrypt.compare(enteredCode, verificationCodeHash);

  if (!isMatch) {
    return {
      isVerified: false,
      reason: 'mismatch',
    };
  }

  return true;
};

export const verifyEmailVerificationCodeAndActivateAccount = async ({
  email,
  enteredCode,
}: VerifyEmailVerificationCodeAndActivateAccountInput): Promise<VerifyEmailVerificationCodeAndActivateAccountResult> => {
  const account = await prisma.user.findUnique({
    where: { email },
  });

  if (!account) {
    return {
      isVerified: false,
      reason: 'account_not_found',
    };
  }

  if (account.isVerified) {
    return {
      isVerified: false,
      reason: 'already_verified',
    };
  }

  if (!account.verificationCodeHash || !account.verificationCodeExpiresAt) {
    return {
      isVerified: false,
      reason: 'missing_verification_code',
    };
  }

  const verificationResult = await verifyEmailVerificationCode({
    enteredCode,
    verificationCodeHash: account.verificationCodeHash,
    expiresAt: account.verificationCodeExpiresAt,
  });

  if (verificationResult !== true) {
    return verificationResult;
  }

  return prisma.user.update({
    where: { email },
    data: {
      isVerified: true,
      verificationCodeHash: null,
      verificationCodeExpiresAt: null,
    },
  });
};
