type SendVerificationEmailInput = {
  email: string;
  code: string;
};

type SendVerificationEmailResult = {
  id: string;
};

type ResendEmailResponse = {
  id: string;
};

export const sendVerificationEmail = async ({
  email,
  code,
}: SendVerificationEmailInput): Promise<SendVerificationEmailResult> => {
  const fromAddress = process.env.EMAIL_FROM ?? 'onboarding@resend.dev';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY ?? ''}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: email,
      subject: 'Verify your AnglerCast account',
      html: `<p>Your AnglerCast verification code is <strong>${code}</strong>.</p>`,
    }),
  });
  const resendResponse = (await response.json()) as ResendEmailResponse;

  return {
    id: resendResponse.id,
  };
};