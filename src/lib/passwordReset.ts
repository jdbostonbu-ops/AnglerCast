import bcrypt from 'bcryptjs';
import { randomInt } from 'node:crypto';

type PasswordResetCode = {
  code: string;
  resetCodeHash: string;
  expiresAt: Date;
};

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
