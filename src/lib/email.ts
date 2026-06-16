type SendVerificationEmailInput = {
  email: string;
  code: string;
};

type SendVerificationEmailResult = {
  id: string;
};

export const sendVerificationEmail = async ({
  email,
  code,
}: SendVerificationEmailInput): Promise<SendVerificationEmailResult> => {
  void email;
  void code;

  return {
    id: 'verification-email-not-configured',
  };
};
