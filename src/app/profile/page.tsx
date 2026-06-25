'use client';

import { ProfileForm } from '@/components/ProfileForm';

type ProfileFormData = {
  profileName: string;
  profileImageUrl: string;
};

type UploadImageResponse = {
  path: string;
};

export default function ProfilePage() {
  const handleSave = async ({
    profileName,
    profileImageUrl,
  }: ProfileFormData): Promise<void> => {
    const response = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileName, profileImageUrl }),
    });

    if (response.ok) {
      window.location.href = '/';
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();

    formData.append('image', file);

    const response = await fetch('/api/profile/image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      return '';
    }

    const body = (await response.json()) as UploadImageResponse;

    return body.path;
  };

  return (
    <main>
      <h1>Set up your profile</h1>
      <ProfileForm onSave={handleSave} uploadImage={uploadImage} />
    </main>
  );
}
