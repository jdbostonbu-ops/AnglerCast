import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import ResetRequestPage from '@/app/reset-request/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe('ResetRequestPage', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ ok: true }),
      })),
    );
  });

  it('renders an email field and a submit button', () => {
    render(<ResetRequestPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send|reset/i })).toBeInTheDocument();
  });

 it('submits the email and shows a confirmation message', async () => {
    render(<ResetRequestPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'angler@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send|reset/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/auth/reset-request',
        expect.objectContaining({ method: 'POST' }),
      );
    });

    expect(
      await screen.findByText(/if an account exists|check your email|sent/i),
    ).toBeInTheDocument();
  });

  it('shows a link to the confirm page after a successful request', async () => {
    render(<ResetRequestPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'angler@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send|reset/i }));

    const confirmLink = await screen.findByRole('link', { name: /enter.*code|reset code|confirm/i });
    expect(confirmLink).toHaveAttribute('href', '/reset-confirm');
  });
});
 