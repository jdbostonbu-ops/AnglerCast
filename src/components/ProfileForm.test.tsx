import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProfileForm } from '@/components/ProfileForm';

describe('ProfileForm rendering', () => {
  it('renders a profile name field, an image URL field, and a Save button', () => {
    render(<ProfileForm onSave={() => {}} />);

    expect(screen.getByLabelText(/profile name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });
});