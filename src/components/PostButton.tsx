'use client';

import { useState, type ReactElement } from 'react';
import { canPostCatch } from '@/lib/profile';

type PostButtonProps = {
  profileName: string | null;
  onPost: () => void;
};

export const PostButton = ({
  profileName,
  onPost,
}: PostButtonProps): ReactElement => {
  const [showProfileMessage, setShowProfileMessage] = useState(false);

  const handlePostClick = (): void => {
    const postStatus = canPostCatch({ profileName });

    if (!postStatus.allowed) {
      setShowProfileMessage(true);
      return;
    }

    setShowProfileMessage(false);
    onPost();
  };

  return (
    <div>
      <button type="button" onClick={handlePostClick}>
        Post
      </button>
      {showProfileMessage ? <div role="dialog">Set up profile</div> : null}
    </div>
  );
};
