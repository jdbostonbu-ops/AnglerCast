'use client';

import { useState, type ReactElement } from 'react';
import { canPostCatch } from '@/lib/profile';

type CatchComposerProps = {
  profileName: string | null;
  onPost: (body: string) => void | Promise<void>;
};

export const CatchComposer = ({
  profileName,
  onPost,
}: CatchComposerProps): ReactElement => {
  const [body, setBody] = useState('');
  const [showProfilePrompt, setShowProfilePrompt] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async (): Promise<void> => {
    if (isPosting) {
      return;
    }

    const postStatus = canPostCatch({ profileName });

    if (!postStatus.allowed) {
      setShowProfilePrompt(true);
      return;
    }

    setShowProfilePrompt(false);
    setIsPosting(true);

    try {
      await onPost(body);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div>
      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <button type="button" disabled={isPosting} onClick={handlePost}>
        Post
      </button>
      {showProfilePrompt ? <a href="/profile">Set up profile</a> : null}
    </div>
  );
};
