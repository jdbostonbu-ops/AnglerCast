'use client';

import type { ReactElement } from 'react';

type CatchPostAvatar =
  | {
      kind: 'image';
      src: string;
    }
  | {
      kind: 'letter';
      letter: string;
    };

type CatchPostProps = {
  post: {
    id: string;
    userId: string;
    body: string;
    author: {
      profileName: string;
      avatar: CatchPostAvatar;
    };
  };
  currentUserId: string;
  onUpdate: (newBody: string) => void;
  onDelete: () => void;
};

export const CatchPost = ({
  post,
  currentUserId,
}: CatchPostProps): ReactElement => {
  const isOwnPost = currentUserId === post.userId;

  return (
    <article>
      <div>
        {post.author.avatar.kind === 'image' ? (
          <img alt={`${post.author.profileName} avatar`} src={post.author.avatar.src} />
        ) : (
          <span>{post.author.avatar.letter}</span>
        )}
        <span>{post.author.profileName}</span>
      </div>
      <p>{post.body}</p>
      {isOwnPost ? <button type="button">Edit</button> : null}
    </article>
  );
};
