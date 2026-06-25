import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { CatchFeed, } from '@/components/CatchFeed';

describe('CatchFeed polling', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('fetches on mount and again after the polling interval elapses', async () => {
    const fetchReports = vi.fn().mockResolvedValue([]);

    render(<CatchFeed waterType="freshwater" fetchReports={fetchReports} />);

    // Called once on mount
    expect(fetchReports).toHaveBeenCalledTimes(1);
    expect(fetchReports).toHaveBeenCalledWith({ waterType: 'freshwater' });

    // Advance time by the polling interval (10 seconds)
    await vi.advanceTimersByTimeAsync(10000);

    // Called again after the interval
    expect(fetchReports).toHaveBeenCalledTimes(2);
  });
});

describe('CatchFeed renders new posts', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows a newly-posted catch after the next poll without a manual refresh', async () => {
    const firstBatch = [
      {
        id: 'catch-1',
        userId: 'user-1',
        body: 'First catch of the day.',
        author: { profileName: 'angler-one', avatar: { kind: 'letter', letter: 'A' } },
      },
    ];

    const secondBatch = [
      {
        id: 'catch-2',
        userId: 'user-2',
        body: 'A brand new catch just came in.',
        author: { profileName: 'angler-two', avatar: { kind: 'letter', letter: 'B' } },
      },
      ...firstBatch,
    ];

    const fetchReports = vi
      .fn()
      .mockResolvedValueOnce(firstBatch)
      .mockResolvedValueOnce(secondBatch);

    render(<CatchFeed waterType="freshwater" fetchReports={fetchReports} />);

    // Let the mount fetch resolve (flush pending promises under fake timers)
    await vi.advanceTimersByTimeAsync(0);
    expect(screen.getByText('First catch of the day.')).toBeInTheDocument();
    expect(screen.queryByText('A brand new catch just came in.')).toBeNull();

    // Advance to the next poll and flush its promise
    await vi.advanceTimersByTimeAsync(10000);
    await vi.advanceTimersByTimeAsync(0);
    expect(
      screen.getByText('A brand new catch just came in.'),
    ).toBeInTheDocument();
  });
});

describe('CatchFeed stops polling on unmount', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not fetch again after the component unmounts', async () => {
    const fetchReports = vi.fn().mockResolvedValue([]);

    const { unmount } = render(
      <CatchFeed waterType="freshwater" fetchReports={fetchReports} />,
    );

    // Mount fetch happened once
    await vi.advanceTimersByTimeAsync(0);
    expect(fetchReports).toHaveBeenCalledTimes(1);

    // Unmount the feed
    unmount();

    // Advance well past several polling intervals
    await vi.advanceTimersByTimeAsync(30000);

    // No further fetches — the interval was cleared on unmount
    expect(fetchReports).toHaveBeenCalledTimes(1);
  });
});

describe('CatchFeed renders posts as CatchPost with edit and delete', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows edit and delete controls on the current user\'s own posts', async () => {
    const posts = [
      {
        id: 'catch-1',
        userId: 'user-1',
        body: 'My own catch.',
        author: { profileName: 'trigger', avatar: { kind: 'letter', letter: 'T' } },
      },
    ];
    const fetchReports = vi.fn().mockResolvedValue(posts);

    render(
      <CatchFeed
        waterType="saltwater"
        fetchReports={fetchReports}
        currentUserId="user-1"
        onUpdate={() => {}}
        onDelete={() => {}}
      />,
    );

    await vi.advanceTimersByTimeAsync(0);
    await vi.advanceTimersByTimeAsync(0);

    expect(screen.getByText('My own catch.')).toBeInTheDocument();
    // CatchPost shows edit + delete buttons on the owner's posts
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });
});

describe('CatchFeed refreshes immediately when the refresh key changes', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('re-fetches right away when refreshKey changes, without waiting for the poll interval', async () => {
    const fetchReports = vi.fn().mockResolvedValue([]);

    const { rerender } = render(
      <CatchFeed waterType="saltwater" fetchReports={fetchReports} refreshKey={0} />,
    );

    // Mount fetch
    await vi.advanceTimersByTimeAsync(0);
    expect(fetchReports).toHaveBeenCalledTimes(1);

    // Change the refresh key (simulating a successful post) WITHOUT advancing the 10s timer
    rerender(
      <CatchFeed waterType="saltwater" fetchReports={fetchReports} refreshKey={1} />,
    );
    await vi.advanceTimersByTimeAsync(0);

    // It fetched again immediately because the key changed (not because the interval elapsed)
    expect(fetchReports).toHaveBeenCalledTimes(2);
  });
});