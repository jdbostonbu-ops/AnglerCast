'use client';

import { useState, type ReactElement } from 'react';
import { canPostCatch } from '@/lib/profile';
import { Spinner } from '@/components/Spinner';

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
      setBody('');
    } catch {
      // Keep the typed text when posting fails.
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div>
      <textarea
        id="catch-composer-body"
        name="catchBody"
        value={body}
        onChange={(event) => setBody(event.target.value)}
        style={{ width: '100%', minHeight: '80px', boxSizing: 'border-box' }}
      />
      <button type="button" disabled={isPosting} onClick={handlePost}>
        {isPosting ? (
          <>
            <Spinner /> Posting...
          </>
        ) : (
          'Post'
        )}
      </button>
      {showProfilePrompt ? <a href="/profile">Set up profile</a> : null}
    </div>
  );
};
