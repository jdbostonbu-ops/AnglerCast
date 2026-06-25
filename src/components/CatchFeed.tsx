'use client';

import { useEffect, useState, type ReactElement } from 'react';

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
};

export const CatchFeed = ({
  waterType,
  fetchReports,
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
        <article key={post.id}>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
};
