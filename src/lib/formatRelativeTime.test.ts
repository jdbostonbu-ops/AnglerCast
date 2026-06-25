import { describe, it, expect } from 'vitest';
import { formatRelativeTime } from '@/lib/formatRelativeTime';

const now = new Date('2026-06-25T12:00:00.000Z');

describe('formatRelativeTime', () => {
  it('returns "just now" for times under a minute ago', () => {
    const date = new Date('2026-06-25T11:59:30.000Z'); // 30s ago
    expect(formatRelativeTime(date, now)).toBe('just now');
  });

  it('returns minutes for times under an hour ago', () => {
    const date = new Date('2026-06-25T11:45:00.000Z'); // 15 min ago
    expect(formatRelativeTime(date, now)).toBe('15 minutes ago');
  });

  it('uses the singular "minute" for exactly one minute', () => {
    const date = new Date('2026-06-25T11:59:00.000Z'); // 1 min ago
    expect(formatRelativeTime(date, now)).toBe('1 minute ago');
  });

  it('returns hours for times under a day ago', () => {
    const date = new Date('2026-06-25T09:00:00.000Z'); // 3 hours ago
    expect(formatRelativeTime(date, now)).toBe('3 hours ago');
  });

  it('uses the singular "hour" for exactly one hour', () => {
    const date = new Date('2026-06-25T11:00:00.000Z'); // 1 hour ago
    expect(formatRelativeTime(date, now)).toBe('1 hour ago');
  });

  it('returns days for times a day or more ago', () => {
    const date = new Date('2026-06-22T12:00:00.000Z'); // 3 days ago
    expect(formatRelativeTime(date, now)).toBe('3 days ago');
  });

  it('uses the singular "day" for exactly one day', () => {
    const date = new Date('2026-06-24T12:00:00.000Z'); // 1 day ago
    expect(formatRelativeTime(date, now)).toBe('1 day ago');
  });

  it('accepts a date string as input', () => {
    expect(formatRelativeTime('2026-06-25T09:00:00.000Z', now)).toBe('3 hours ago');
  });
});