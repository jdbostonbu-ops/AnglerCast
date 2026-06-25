'use client';

import { useState, type ReactElement } from 'react';
import { canPostCatch } from '@/lib/profile';

type CatchComposerProps = {
  profileName: string | null;
  onPost: (body: string) => void;
};

export const CatchComposer = ({
  profileName,
  onPost,
}: CatchComposerProps): ReactElement => {
  const [body, setBody] = useState('');
  const [showProfilePrompt, setShowProfilePrompt] = useState(false);

  const handlePost = (): void => {
    const postStatus = canPostCatch({ profileName });

    if (!postStatus.allowed) {
      setShowProfilePrompt(true);
      return;
    }

    setShowProfilePrompt(false);
    onPost(body);
  };

  return (
    <div>
      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <button type="button" onClick={handlePost}>
        Post
      </button>
      {showProfilePrompt ? <a href="/profile">Set up profile</a> : null}
    </div>
  );
};
