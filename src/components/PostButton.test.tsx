import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PostButton } from '@/components/PostButton';

describe('PostButton', () => {
  it('shows the "Set up profile" dialog and does NOT submit when there is no profile name', () => {
    const onPost = vi.fn();

    render(<PostButton profileName={null} onPost={onPost} />);

    fireEvent.click(screen.getByRole('button', { name: /post/i }));

    expect(
      screen.getByText(/set up profile/i),
    ).toBeInTheDocument();
    expect(onPost).not.toHaveBeenCalled();
  });

  it('calls onPost and does NOT show the dialog when a profile name is set', () => {
    const onPost = vi.fn();

    render(<PostButton profileName="trigger" onPost={onPost} />);

    fireEvent.click(screen.getByRole('button', { name: /post/i }));

    expect(onPost).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/set up profile/i)).toBeNull();
  });
});