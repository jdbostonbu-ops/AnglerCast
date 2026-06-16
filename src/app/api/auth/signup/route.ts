import bcrypt from 'bcryptjs';
import { createEmailVerificationCode } from '@/lib/emailVerification';
import { sendVerificationEmail } from '@/lib/email';
import { prisma } from '@/lib/prisma';

const passwordHashSaltRounds = 10;

type SignupRequestBody = {
  email: string;
  password: string;
};

export async function POST(request: Request): Promise<Response> {
  const { email, password } = (await request.json()) as SignupRequestBody;
  const passwordHash = await bcrypt.hash(password, passwordHashSaltRounds);
  const verificationCode = await createEmailVerificationCode();

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      isVerified: false,
      verificationCodeHash: verificationCode.verificationCodeHash,
      verificationCodeExpiresAt: verificationCode.expiresAt,
    },
  });

  await sendVerificationEmail({
    email,
    code: verificationCode.code,
  });

  return Response.json(
    {
      user: {
        id: user.id,
        email: user.email,
        isVerified: user.isVerified,
      },
    },
    { status: 201 },
  );
}
