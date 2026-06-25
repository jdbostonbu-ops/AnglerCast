'use client';

import { useCallback, useEffect, useRef, useState, type ReactElement } from 'react';
import { CatchPost } from '@/components/CatchPost';

type CatchFeedPost = {
  id: string;
  userId: string;
  body: string;
  createdAt: Date;
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
  refreshKey?: number;
};

export const CatchFeed = ({
  waterType,
  fetchReports,
  currentUserId,
  onUpdate,
  onDelete,
  refreshKey,
}: CatchFeedProps): ReactElement => {
  const [posts, setPosts] = useState<CatchFeedPost[]>([]);
  const hasHandledInitialRefreshKey = useRef(false);

  const loadAndStoreReports = useCallback(async (): Promise<void> => {
    const fetchedPosts = await fetchReports({ waterType });

    setPosts(fetchedPosts);
  }, [fetchReports, waterType]);

  useEffect(() => {
    void loadAndStoreReports();

    const intervalId = window.setInterval(() => {
      void loadAndStoreReports();
    }, 10000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [loadAndStoreReports]);

  useEffect(() => {
    if (!hasHandledInitialRefreshKey.current) {
      hasHandledInitialRefreshKey.current = true;
      return;
    }

    void loadAndStoreReports();
  }, [loadAndStoreReports, refreshKey]);

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
