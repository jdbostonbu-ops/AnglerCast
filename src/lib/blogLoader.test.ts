import { describe, it, expect, vi, beforeEach } from 'vitest';

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

import { loadBlogPosts } from './blogLoader';

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
});