import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

describe('CatchComposer prevents double submitting', () => {
  it('does not call onPost again while a previous post is still in progress', async () => {
    // onPost that stays pending until we resolve it
    let resolvePost: (() => void) | undefined;
    const onPost = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolvePost = resolve;
        }),
    );

    render(<CatchComposer profileName="trigger" onPost={onPost} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Striped bass at dawn.' },
    });

    const postButton = screen.getByRole('button', { name: /post/i });

    // First click starts the post (stays pending)
    fireEvent.click(postButton);
    // Second click while still pending should be ignored
    fireEvent.click(postButton);

    expect(onPost).toHaveBeenCalledTimes(1);

    // The button is disabled while posting
    expect(postButton).toBeDisabled();

    // Finish the post
    resolvePost?.();
  });
});

describe('CatchComposer clears after a successful post', () => {
  it('empties the textarea once onPost resolves', async () => {
    const onPost = vi.fn().mockResolvedValue(undefined);

    render(<CatchComposer profileName="trigger" onPost={onPost} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, {
      target: { value: 'Caught a striper at the reef.' },
    });
    expect(textarea).toHaveValue('Caught a striper at the reef.');

    fireEvent.click(screen.getByRole('button', { name: /post/i }));

    // Wait for the async onPost to resolve and the textarea to clear
    await waitFor(() => {
      expect(textarea).toHaveValue('');
    });

    expect(onPost).toHaveBeenCalledWith('Caught a striper at the reef.');
  });

  it('keeps the text when the post fails', async () => {
    const onPost = vi.fn().mockRejectedValue(new Error('network error'));

    render(<CatchComposer profileName="trigger" onPost={onPost} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, {
      target: { value: 'This should stay if it fails.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /post/i }));

    // Give the rejected promise a chance to settle
    await waitFor(() => {
      expect(onPost).toHaveBeenCalled();
    });

    // Text is preserved because the post failed
    expect(textarea).toHaveValue('This should stay if it fails.');
  });
});