import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loadBlogPosts } from './blogLoader';

vi.mock('fs/promises', () => ({
  readdir: vi.fn(),
  readFile: vi.fn(),
}));

import { readdir, readFile } from 'fs/promises';

const mockedReaddir = readdir as ReturnType<typeof vi.fn>;
const mockedReadFile = readFile as ReturnType<typeof vi.fn>;

describe('loadBlogPosts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns posts sorted newest-first by date from frontmatter', async () => {
    mockedReaddir.mockResolvedValue([
      '2026-06-20-older-post.md',
      '2026-06-25-newer-post.md',
    ] as never);

    mockedReadFile.mockImplementation(async (path: string) => {
      if (path.includes('2026-06-20-older-post.md')) {
        return [
          '---',
          'title: Older Post',
          'date: 2026-06-20',
          '---',
          '',
          'This is the older post body.',
        ].join('\n');
      }
      if (path.includes('2026-06-25-newer-post.md')) {
        return [
          '---',
          'title: Newer Post',
          'date: 2026-06-25',
          '---',
          '',
          'This is the newer post body.',
        ].join('\n');
      }
      throw new Error(`unexpected path: ${path}`);
    });

    const posts = await loadBlogPosts();

    expect(posts).toHaveLength(2);

    // newest first
    expect(posts[0].slug).toBe('2026-06-25-newer-post');
    expect(posts[0].title).toBe('Newer Post');
    expect(posts[0].date).toBe('2026-06-25');
    expect(posts[0].body).toContain('This is the newer post body.');

    expect(posts[1].slug).toBe('2026-06-20-older-post');
    expect(posts[1].title).toBe('Older Post');
    expect(posts[1].date).toBe('2026-06-20');
    expect(posts[1].body).toContain('This is the older post body.');
  });
});