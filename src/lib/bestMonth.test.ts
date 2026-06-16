import { describe, expect, it } from 'vitest';
import { findBestMonth } from '@/lib/bestMonth';

describe('findBestMonth', () => {
  it('returns the month with the highest record share plus rate, total count, and confidence', () => {
    const records = [
      { eventDate: '2026-06-01T00:00:00.000Z' },
      { eventDate: '2026-06-05T00:00:00.000Z' },
      { eventDate: '2026-06-10T00:00:00.000Z' },
      { eventDate: '2026-06-15T00:00:00.000Z' },
      { eventDate: '2026-06-20T00:00:00.000Z' },
      { eventDate: '2026-06-25T00:00:00.000Z' },
      { eventDate: '2026-06-30T00:00:00.000Z' },
      { eventDate: '2026-05-03T00:00:00.000Z' },
      { eventDate: '2026-05-17T00:00:00.000Z' },
      { eventDate: '2026-07-08T00:00:00.000Z' },
      { eventDate: '2026-07-22T00:00:00.000Z' },
      { eventDate: '2026-08-12T00:00:00.000Z' },
    ];

    expect(findBestMonth(records)).toEqual({
      month: 6,
      rate: 7 / 12,
      totalCount: 12,
      confidence: 'moderate',
    });
  });
});
