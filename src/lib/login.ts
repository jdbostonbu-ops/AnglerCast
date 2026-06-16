import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

type CheckLoginCredentialsInput = {
  email: string;
  password: string;
};

type CheckLoginCredentialsSuccessResult = {
  isAuthenticated: true;
  user: {
    id: string;
    email: string;
  };
};

type CheckLoginCredentialsFailureResult = {
  isAuthenticated: false;
  reason: 'invalid_credentials' | 'email_not_verified' | 'wrong_password';
};

type CheckLoginCredentialsResult =
  | CheckLoginCredentialsSuccessResult
  | CheckLoginCredentialsFailureResult;

export const checkLoginCredentials = async ({
  email,
  password,
}: CheckLoginCredentialsInput): Promise<CheckLoginCredentialsResult> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      isAuthenticated: false,
      reason: 'invalid_credentials',
    };
  }

  if (!user.isVerified) {
    return {
      isAuthenticated: false,
      reason: 'email_not_verified',
    };
  }

  const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordMatch) {
    return {
      isAuthenticated: false,
      reason: 'wrong_password',
    };
  }

  return {
    isAuthenticated: true,
    user: {
      id: user.id,
      email: user.email,
    },
  };
};
