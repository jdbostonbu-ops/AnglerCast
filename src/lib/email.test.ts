import { afterEach, describe, expect, it, vi } from 'vitest';
import { sendVerificationEmail, sendPasswordResetEmail } from '@/lib/email';

describe('sendVerificationEmail', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts the verification code email to Resend and returns the email id', async () => {
    const email = 'angler@example.com';
    const code = '123456';
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({ id: 'email_123' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );

    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('RESEND_API_KEY', 'resend_test_key');

    const result = await sendVerificationEmail({ email, code });

    expect(fetchMock).toHaveBeenCalledWith('https://api.resend.com/emails', expect.any(Object));

    const requestInit = fetchMock.mock.calls[0]?.[1];
    expect(requestInit).toBeDefined();
    expect(requestInit?.method).toBe('POST');
    expect(requestInit?.headers).toEqual(
      expect.objectContaining({
        Authorization: expect.stringContaining('resend_test_key'),
      }),
    );
    expect(typeof requestInit?.body).toBe('string');

    const requestBody = JSON.parse(requestInit?.body as string) as {
      from: string;
      to: string;
    };

    expect(requestBody.from).toBe('onboarding@resend.dev');
    expect(requestBody.to).toBe(email);
    expect(JSON.stringify(requestBody)).toContain(code);
    expect(result).toEqual({ id: 'email_123' });
  });
});

describe('sendPasswordResetEmail', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts the password reset code email to Resend and returns the email id', async () => {
    const email = 'angler@example.com';
    const code = '654321';
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({ id: 'email_456' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('RESEND_API_KEY', 'resend_test_key');

    const result = await sendPasswordResetEmail({ email, code });

    expect(fetchMock).toHaveBeenCalledWith('https://api.resend.com/emails', expect.any(Object));
    const requestInit = fetchMock.mock.calls[0]?.[1];
    expect(requestInit).toBeDefined();
    expect(requestInit?.method).toBe('POST');
    expect(requestInit?.headers).toEqual(
      expect.objectContaining({
        Authorization: expect.stringContaining('resend_test_key'),
      }),
    );
    expect(typeof requestInit?.body).toBe('string');
    const requestBody = JSON.parse(requestInit?.body as string) as {
      from: string;
      to: string;
    };
    expect(requestBody.from).toBe('onboarding@resend.dev');
    expect(requestBody.to).toBe(email);
    expect(JSON.stringify(requestBody)).toContain(code);
    expect(result).toEqual({ id: 'email_456' });
  });
});
