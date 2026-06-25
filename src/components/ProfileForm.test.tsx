import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ProfileForm } from '@/components/ProfileForm';

describe('ProfileForm rendering', () => {
  it('renders a profile name field, an image URL field, and a Save button', () => {
    render(<ProfileForm onSave={() => {}} />);

    expect(screen.getByLabelText(/profile name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });
});

describe('ProfileForm submit', () => {
  it('calls onSave once with the entered profile name and image URL', () => {
    const onSave = vi.fn();

    render(<ProfileForm onSave={onSave} />);

    fireEvent.change(screen.getByLabelText(/profile name/i), {
      target: { value: 'trigger' },
    });
    fireEvent.change(screen.getByLabelText(/image url/i), {
      target: { value: 'https://example.com/avatar.png' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith({
      profileName: 'trigger',
      profileImageUrl: 'https://example.com/avatar.png',
    });
  });
});