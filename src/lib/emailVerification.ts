import bcrypt from 'bcryptjs';
import { randomInt } from 'node:crypto';

type EmailVerificationCode = {
  code: string;
  verificationCodeHash: string;
  expiresAt: Date;
};

const verificationCodeLength = 6;
const verificationCodeExpiryMinutes = 15;
const bcryptSaltRounds = 10;

export const createEmailVerificationCode = async (): Promise<EmailVerificationCode> => {
  const code = randomInt(0, 10 ** verificationCodeLength)
    .toString()
    .padStart(verificationCodeLength, '0');
  const verificationCodeHash = bcrypt.hashSync(code, bcryptSaltRounds);
  const expiresAt = new Date(Date.now() + verificationCodeExpiryMinutes * 60 * 1000);

  return {
    code,
    verificationCodeHash,
    expiresAt,
  };
};
