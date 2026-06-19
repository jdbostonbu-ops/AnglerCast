import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LoginPage from '@/app/login/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe('LoginPage', () => {
  it('renders a link to the password reset page', () => {
    render(<LoginPage />);
    expect(
      screen.getByRole('link', { name: /forgot password/i }),
    ).toHaveAttribute('href', '/reset-request');
  });
});