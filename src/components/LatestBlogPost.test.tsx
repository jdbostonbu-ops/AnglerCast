import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

const { mockGetLatestBlogPost } = vi.hoisted(() => ({
  mockGetLatestBlogPost: vi.fn(),
}));

vi.mock('@/lib/blogLoader', () => ({
  getLatestBlogPost: mockGetLatestBlogPost,
}));

import { LatestBlogPost } from './LatestBlogPost';

describe('LatestBlogPost', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the post title and body when a post exists', async () => {
    mockGetLatestBlogPost.mockResolvedValue({
      slug: '2026-06-25-where-the-fish-are',
      title: 'Where the fish actually are',
      date: '2026-06-25',
      body: '## Real talk about real records\n\nAnglers across the Northeast have been asking the same question.',
    });

    const ui = await LatestBlogPost();
    render(ui);

    // title is rendered as a heading
    expect(
      screen.getByRole('heading', { name: 'Where the fish actually are' })
    ).toBeInTheDocument();

    // markdown body's `## subheading` becomes an actual heading element
    // (this proves the body is rendered via a markdown renderer, not as plain text)
    expect(
      screen.getByRole('heading', { name: 'Real talk about real records' })
    ).toBeInTheDocument();

    // body paragraph text is present
    expect(
      screen.getByText(/Anglers across the Northeast/)
    ).toBeInTheDocument();
  });

  it('renders nothing when no posts exist', async () => {
    mockGetLatestBlogPost.mockResolvedValue(null);

    const ui = await LatestBlogPost();

    expect(ui).toBeNull();
  });
});