import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { PasswordField } from '@/components/PasswordField';

describe('PasswordField', () => {
  it('starts hidden and becomes visible after clicking the show password toggle', async () => {
    const user = userEvent.setup();

    render(<PasswordField label="Password" name="password" />);

    const passwordInput = screen.getByLabelText('Password');
    const toggleButton = screen.getByRole('button', {
      name: 'Show password',
    });

    expect(passwordInput).toHaveAttribute('type', 'password');

    await user.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});
