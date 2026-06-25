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

describe('ProfileForm empty name validation', () => {
  it('shows an error and does not call onSave when the profile name is empty', () => {
    const onSave = vi.fn();

    render(<ProfileForm onSave={onSave} />);

    // Leave profile name empty; click Save
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(onSave).not.toHaveBeenCalled();
    expect(screen.getByText(/profile name is required/i)).toBeInTheDocument();
  });

  it('does not show the error once a valid name is entered and saved', () => {
    const onSave = vi.fn();

    render(<ProfileForm onSave={onSave} />);

    // First trigger the error
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.getByText(/profile name is required/i)).toBeInTheDocument();

    // Now enter a valid name and save
    fireEvent.change(screen.getByLabelText(/profile name/i), {
      target: { value: 'trigger' },
    });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith({
      profileName: 'trigger',
      profileImageUrl: '',
    });
    expect(screen.queryByText(/profile name is required/i)).toBeNull();
  });
});