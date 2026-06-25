'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';
import { formatRelativeTime } from '@/lib/formatRelativeTime';
import { withMinimumDuration } from '@/lib/withMinimumDuration';
import { Spinner } from '@/components/Spinner';

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
    createdAt: Date;
    author: {
      profileName: string;
      avatar: CatchPostAvatar;
    };
  };
  currentUserId: string;
  onUpdate: (newBody: string) => void | Promise<void>;
  onDelete: () => void | Promise<void>;
};

export const CatchPost = ({
  post,
  currentUserId,
  onUpdate,
  onDelete,
}: CatchPostProps): ReactElement => {
  const isOwnPost = currentUserId === post.userId;
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(post.body);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const relativeTime = formatRelativeTime(post.createdAt, new Date());

  const handleSave = async (): Promise<void> => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      await withMinimumDuration(Promise.resolve(onUpdate(editedBody)));
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);

    try {
      await withMinimumDuration(Promise.resolve(onDelete()));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <article
      style={{
        paddingTop: '16px',
        paddingBottom: '16px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        marginBottom: '8px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {post.author.avatar.kind === 'image' ? (
          <img
            alt={`${post.author.profileName} avatar`}
            src={post.author.avatar.src}
            style={{
              width: '40px',
              height: '40px',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        ) : (
          <span
            style={{
              width: '40px',
              height: '40px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
            }}
          >
            {post.author.avatar.letter}
          </span>
        )}
        <span>{post.author.profileName}</span>
        <span style={{ marginLeft: '8px', opacity: 0.7, fontSize: '0.85em' }}>
          {relativeTime}
        </span>
      </div>
      {isEditing ? (
        <div>
          <textarea
            id="catch-edit-body"
            name="catchEditBody"
            value={editedBody}
            onChange={(event) => setEditedBody(event.target.value)}
          />
          <button type="button" disabled={isSaving} onClick={handleSave}>
            {isSaving ? (
              <>
                <Spinner /> Save
              </>
            ) : (
              'Save'
            )}
          </button>
        </div>
      ) : (
        <p>{post.body}</p>
      )}
      {isOwnPost ? (
        <div>
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button type="button" onClick={() => setIsDeleteDialogOpen(true)}>
            Delete
          </button>
        </div>
      ) : null}
      {isDeleteDialogOpen ? (
        <div role="dialog">
          <button type="button" disabled={isDeleting} onClick={handleConfirmDelete}>
            {isDeleting ? (
              <>
                <Spinner /> Confirm
              </>
            ) : (
              'Confirm'
            )}
          </button>
          <button type="button" onClick={() => setIsDeleteDialogOpen(false)}>
            Cancel
          </button>
        </div>
      ) : null}
    </article>
  );
};
