import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  body: string;
};

type BlogPostResponse = {
  title: string;
  date: string;
  body: string;
};

const blogDirectory = path.join(process.cwd(), 'src', 'lib', 'blog');

const parseFrontmatter = (
  fileContents: string,
): { title: string; date: string; body: string } => {
  const lines = fileContents.split(/\r?\n/);

  if (lines[0] !== '---') {
    return {
      title: '',
      date: '',
      body: fileContents.trim(),
    };
  }

  const closingIndex = lines.findIndex(
    (line, index) => index > 0 && line === '---',
  );

  if (closingIndex === -1) {
    return {
      title: '',
      date: '',
      body: fileContents.trim(),
    };
  }

  const frontmatter = lines.slice(1, closingIndex);
  const body = lines.slice(closingIndex + 1).join('\n').trim();
  const values = frontmatter.reduce<Record<string, string>>((fields, line) => {
    const separatorIndex = line.indexOf(':');

    if (separatorIndex === -1) {
      return fields;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    return {
      ...fields,
      [key]: value,
    };
  }, {});

  return {
    title: values.title ?? '',
    date: values.date ?? '',
    body,
  };
};

export const loadBlogPosts = async (): Promise<BlogPost[]> => {
  let filenames: string[];

  try {
    filenames = await readdir(blogDirectory);
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    ) {
      return [];
    }

    throw error;
  }

  const markdownFilenames = filenames
    .filter((filename) => filename.endsWith('.md'))
    .sort();
  const posts = await Promise.all(
    markdownFilenames.map(async (filename) => {
      const fileContents = await readFile(
        path.join(blogDirectory, filename),
        'utf8',
      );
      const { title, date, body } = parseFrontmatter(fileContents);

      return {
        slug: filename.replace(/\.md$/, ''),
        title,
        date,
        body,
      };
    }),
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
};

export const getLatestBlogPost = async (): Promise<BlogPost | null> => {
  const blogJsonUrl = process.env.BLOG_JSON_URL;

  if (blogJsonUrl === undefined || blogJsonUrl === '') {
    return null;
  }

  try {
    const response = await fetch(blogJsonUrl);

    if (!response.ok) {
      return null;
    }

    const post = (await response.json()) as BlogPostResponse;

    return {
      slug: post.date.slice(0, 10),
      title: post.title,
      date: post.date,
      body: post.body,
    };
  } catch {
    return null;
  }
};
