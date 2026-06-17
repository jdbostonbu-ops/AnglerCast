import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockDelete } = vi.hoisted(() => ({ mockDelete: vi.fn() }));

vi.mock('next/headers', () => ({
  cookies: vi.fn(async () => ({
    set: vi.fn(),
    get: vi.fn(),
    delete: mockDelete,
  })),
}));

import { clearSession } from '@/lib/session';

describe('clearSession', () => {
  beforeEach(() => {
    mockDelete.mockClear();
  });

  it('deletes the anglercast_session cookie', async () => {
    await clearSession();
    expect(mockDelete).toHaveBeenCalledWith('anglercast_session');
  });
});