import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const { mockReaddir, mockReadFile } = vi.hoisted(() => ({
  mockReaddir: vi.fn(),
  mockReadFile: vi.fn(),
}));

vi.mock('node:fs/promises', () => {
  const mockedModule = {
    readdir: mockReaddir,
    readFile: mockReadFile,
  };
  return {
    ...mockedModule,
    default: mockedModule,
  };
});

import { loadBlogPosts, getLatestBlogPost } from './blogLoader';

describe('loadBlogPosts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns posts sorted newest-first by date from frontmatter', async () => {
    mockReaddir.mockResolvedValue([
      '2026-06-20-older-post.md',
      '2026-06-25-newer-post.md',
    ] as never);

    mockReadFile.mockImplementation(async (filePath: string) => {
      if (filePath.includes('2026-06-20-older-post.md')) {
        return [
          '---',
          'title: Older Post',
          'date: 2026-06-20',
          '---',
          '',
          'This is the older post body.',
        ].join('\n');
      }
      if (filePath.includes('2026-06-25-newer-post.md')) {
        return [
          '---',
          'title: Newer Post',
          'date: 2026-06-25',
          '---',
          '',
          'This is the newer post body.',
        ].join('\n');
      }
      throw new Error(`unexpected path: ${filePath}`);
    });

    const posts = await loadBlogPosts();

    expect(posts).toHaveLength(2);

    expect(posts[0].slug).toBe('2026-06-25-newer-post');
    expect(posts[0].title).toBe('Newer Post');
    expect(posts[0].date).toBe('2026-06-25');
    expect(posts[0].body).toContain('This is the newer post body.');

    expect(posts[1].slug).toBe('2026-06-20-older-post');
    expect(posts[1].title).toBe('Older Post');
    expect(posts[1].date).toBe('2026-06-20');
    expect(posts[1].body).toContain('This is the older post body.');
  });

  it('returns an empty array when the blog directory does not exist', async () => {
    const enoent = Object.assign(new Error('ENOENT: no such file or directory'), {
      code: 'ENOENT',
    });
    mockReaddir.mockRejectedValue(enoent);

    const posts = await loadBlogPosts();

    expect(posts).toEqual([]);
  });
});

describe('getLatestBlogPost — Apps Script JSON endpoint (Section 36)', () => {
  const ORIGINAL_ENV = process.env.BLOG_JSON_URL;
  const FIXTURE_URL = 'https://script.google.com/macros/s/FIXTURE/exec';

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.BLOG_JSON_URL = FIXTURE_URL;
    global.fetch = vi.fn();
  });

  afterEach(() => {
    if (ORIGINAL_ENV === undefined) {
      delete process.env.BLOG_JSON_URL;
    } else {
      process.env.BLOG_JSON_URL = ORIGINAL_ENV;
    }
  });

  it('fetches BLOG_JSON_URL and returns a BlogPost with slug derived from date', async () => {
    const mockFetch = global.fetch as ReturnType<typeof vi.fn>;
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        title: 'Welcome to AnglerCast',
        date: '2026-06-25T04:00:00.000Z',
        body: '## Where the fish actually are\n\nReal records, real talk.',
      }),
    });

    const post = await getLatestBlogPost();

    expect(mockFetch).toHaveBeenCalledWith(FIXTURE_URL);
    expect(post).not.toBeNull();
    expect(post?.title).toBe('Welcome to AnglerCast');
    expect(post?.date).toBe('2026-06-25T04:00:00.000Z');
    expect(post?.slug).toBe('2026-06-25');
    expect(post?.body).toContain('Real records, real talk.');
  });
});