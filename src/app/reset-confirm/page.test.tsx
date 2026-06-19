import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import ResetConfirmPage from '@/app/reset-confirm/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe('ResetConfirmPage', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ ok: true }),
      })),
    );
  });

  it('renders email, code, and new password fields with a submit button', () => {
    render(<ResetConfirmPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
  });

  it('submits the code and new password to the confirm route', async () => {
    render(<ResetConfirmPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'angler@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/code/i), {
      target: { value: '123456' },
    });
    fireEvent.change(screen.getByLabelText(/new password/i), {
      target: { value: 'brand-new-password' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/auth/reset-confirm',
        expect.objectContaining({ method: 'POST' }),
      );
    });
  });
});