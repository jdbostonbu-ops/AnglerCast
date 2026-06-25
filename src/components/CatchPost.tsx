'use client';

import { useState } from 'react';
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
  onUpdate,
}: CatchPostProps): ReactElement => {
  const isOwnPost = currentUserId === post.userId;
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(post.body);

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
      {isEditing ? (
        <div>
          <textarea
            value={editedBody}
            onChange={(event) => setEditedBody(event.target.value)}
          />
          <button type="button" onClick={() => onUpdate(editedBody)}>
            Save
          </button>
        </div>
      ) : (
        <p>{post.body}</p>
      )}
      {isOwnPost ? (
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      ) : null}
    </article>
  );
};
