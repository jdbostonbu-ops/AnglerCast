import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CatchComposer } from '@/components/CatchComposer';

describe('CatchComposer when the user has a profile name', () => {
  it('renders a textarea and a post button', () => {
    render(<CatchComposer profileName="trigger" onPost={() => {}} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /post/i })).toBeInTheDocument();
  });

  it('calls onPost with the typed text when post is clicked', () => {
    const onPost = vi.fn();

    render(<CatchComposer profileName="trigger" onPost={onPost} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Caught a striped bass at dawn.' },
    });
    fireEvent.click(screen.getByRole('button', { name: /post/i }));

    expect(onPost).toHaveBeenCalledTimes(1);
    expect(onPost).toHaveBeenCalledWith('Caught a striped bass at dawn.');
  });
});

describe('CatchComposer when the user has no profile name', () => {
  it('shows a set up profile prompt and does not call onPost', () => {
    const onPost = vi.fn();

    render(<CatchComposer profileName={null} onPost={onPost} />);

    fireEvent.click(screen.getByRole('button', { name: /post/i }));

    expect(onPost).not.toHaveBeenCalled();
    expect(screen.getByText(/set up profile/i)).toBeInTheDocument();
  });

  it('links the set up profile prompt to /profile', () => {
    render(<CatchComposer profileName={null} onPost={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /post/i }));

    expect(
      screen.getByRole('link', { name: /set up profile/i }),
    ).toHaveAttribute('href', '/profile');
  });
});