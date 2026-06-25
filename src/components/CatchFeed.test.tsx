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