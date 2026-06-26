import type { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import { getLatestBlogPost } from '@/lib/blogLoader';

export const LatestBlogPost = async (): Promise<ReactElement | null> => {
  const post = await getLatestBlogPost();

  if (post === null) {
    return null;
  }

  return (
    <article className="latest-blog-post">
      <h2 className="latest-blog-post__title">{post.title}</h2>
      <div className="latest-blog-post__body">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
    </article>
  );
};
