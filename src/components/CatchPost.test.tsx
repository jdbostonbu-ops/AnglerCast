import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CatchPost } from '@/components/CatchPost';

const basePost = {
  id: 'catch-1',
  userId: 'user-1',
  body: 'Caught a smallmouth bass at dawn.',
  author: {
    profileName: 'trigger',
    avatar: { kind: 'letter' as const, letter: 'T' },
  },
};

describe('CatchPost edit button visibility', () => {
  it('shows the pencil edit button when the current user owns the post', () => {
    render(
      <CatchPost
        post={basePost}
        currentUserId="user-1"
        onUpdate={() => {}}
        onDelete={() => {}}
      />,
    );

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
  });

  it('does NOT show the pencil edit button when the current user does not own the post', () => {
    render(
      <CatchPost
        post={basePost}
        currentUserId="user-999"
        onUpdate={() => {}}
        onDelete={() => {}}
      />,
    );

    expect(screen.queryByRole('button', { name: /edit/i })).toBeNull();
  });
});

describe('CatchPost edit mode', () => {
  it('reveals an editable textarea pre-filled with the body and a Save button when the pencil is clicked', () => {
    render(
      <CatchPost
        post={basePost}
        currentUserId="user-1"
        onUpdate={() => {}}
        onDelete={() => {}}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Caught a smallmouth bass at dawn.');

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });
});

describe('CatchPost save', () => {
  it('calls onUpdate once with the edited body when Save is clicked', () => {
    const onUpdate = vi.fn();

    render(
      <CatchPost
        post={basePost}
        currentUserId="user-1"
        onUpdate={onUpdate}
        onDelete={() => {}}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, {
      target: { value: 'Edited: it was a largemouth, not a smallmouth.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(onUpdate).toHaveBeenCalledWith(
      'Edited: it was a largemouth, not a smallmouth.',
    );
  });
});

describe('CatchPost delete confirmation', () => {
  it('opens a confirmation dialog and calls onDelete once when Confirm is clicked', () => {
    const onDelete = vi.fn();

    render(
      <CatchPost
        post={basePost}
        currentUserId="user-1"
        onUpdate={() => {}}
        onDelete={onDelete}
      />,
    );

    // onDelete should not fire just from opening the dialog
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(onDelete).not.toHaveBeenCalled();

    // Confirming the dialog fires onDelete exactly once
    fireEvent.click(screen.getByRole('button', { name: /confirm/i }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});

describe('CatchPost delete cancel', () => {
  it('does not call onDelete and closes the dialog when Cancel is clicked', () => {
    const onDelete = vi.fn();

    render(
      <CatchPost
        post={basePost}
        currentUserId="user-1"
        onUpdate={() => {}}
        onDelete={onDelete}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    // Confirm button is visible while the dialog is open
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

    // onDelete never fires
    expect(onDelete).not.toHaveBeenCalled();
    // Dialog is closed — the Confirm button is gone
    expect(screen.queryByRole('button', { name: /confirm/i })).toBeNull();
  });
});