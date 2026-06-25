'use client';

import { useEffect, useState, type ReactElement } from 'react';
import { CatchPost } from '@/components/CatchPost';

type CatchFeedPost = {
  id: string;
  userId: string;
  body: string;
  author: {
    profileName: string;
    avatar:
      | {
          kind: 'image';
          src: string;
        }
      | {
          kind: 'letter';
          letter: string;
        };
  };
};

type CatchFeedProps = {
  waterType: string;
  fetchReports: (args: { waterType: string }) => Promise<CatchFeedPost[]>;
  currentUserId?: string;
  onUpdate?: (postId: string, newBody: string) => void;
  onDelete?: (postId: string) => void;
};

export const CatchFeed = ({
  waterType,
  fetchReports,
  currentUserId,
  onUpdate,
  onDelete,
}: CatchFeedProps): ReactElement => {
  const [posts, setPosts] = useState<CatchFeedPost[]>([]);

  useEffect(() => {
    const loadAndStoreReports = async (): Promise<void> => {
      const fetchedPosts = await fetchReports({ waterType });

      setPosts(fetchedPosts);
    };

    void loadAndStoreReports();

    const intervalId = window.setInterval(() => {
      void loadAndStoreReports();
    }, 10000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [fetchReports, waterType]);

  return (
    <div>
      {posts.map((post) => (
        <CatchPost
          key={post.id}
          post={post}
          currentUserId={currentUserId ?? ''}
          onUpdate={(newBody) => onUpdate?.(post.id, newBody)}
          onDelete={() => onDelete?.(post.id)}
        />
      ))}
    </div>
  );
};
