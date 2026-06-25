import { render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { CatchFeed } from '@/components/CatchFeed';

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