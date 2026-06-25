import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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