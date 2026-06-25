import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/session', () => ({
  getSessionUserId: vi.fn(),
}));

vi.mock('@/lib/profile', () => ({
  saveProfileName: vi.fn(),
  saveProfileImage: vi.fn(),
}));

import { POST } from '@/app/api/profile/route';
import { getSessionUserId } from '@/lib/session';
import { saveProfileName, saveProfileImage } from '@/lib/profile';

const makeRequest = (body: unknown): Request =>
  new Request('http://localhost/api/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

describe('POST /api/profile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('saves the profile name and image for the logged-in user and returns 200', async () => {
    vi.mocked(getSessionUserId).mockResolvedValueOnce('user-1');

    const response = await POST(
      makeRequest({
        profileName: 'trigger',
        profileImageUrl: 'https://example.com/avatar.png',
      }),
    );

    expect(saveProfileName).toHaveBeenCalledWith({
      userId: 'user-1',
      name: 'trigger',
    });
    expect(saveProfileImage).toHaveBeenCalledWith({
      userId: 'user-1',
      imageUrl: 'https://example.com/avatar.png',
    });
    expect(response.status).toBe(200);
  });

  it('returns 401 and saves nothing when there is no logged-in user', async () => {
    vi.mocked(getSessionUserId).mockResolvedValueOnce(null);

    const response = await POST(
      makeRequest({ profileName: 'trigger', profileImageUrl: '' }),
    );

    expect(saveProfileName).not.toHaveBeenCalled();
    expect(saveProfileImage).not.toHaveBeenCalled();
    expect(response.status).toBe(401);
  });
});
