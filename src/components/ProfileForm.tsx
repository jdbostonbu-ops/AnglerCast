'use client';

import { useRef, useState } from 'react';
import type { ReactElement } from 'react';

type ProfileFormProps = {
  onSave: (data: { profileName: string; profileImageUrl: string }) => void;
  uploadImage: (file: File) => Promise<string>;
};

export const ProfileForm = ({
  onSave,
  uploadImage,
}: ProfileFormProps): ReactElement => {
  const [profileName, setProfileName] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [showProfileNameError, setShowProfileNameError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSave = (): void => {
    if (profileName.trim() === '') {
      setShowProfileNameError(true);
      return;
    }

    setShowProfileNameError(false);
    onSave({ profileName, profileImageUrl });
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const uploadedPath = await uploadImage(file);

    setProfileImageUrl(uploadedPath);
  };

  return (
    <div>
      <label htmlFor="profile-name">Profile name</label>
      <input
        id="profile-name"
        type="text"
        value={profileName}
        onChange={(event) => setProfileName(event.target.value)}
      />

      <input
        ref={fileInputRef}
        data-testid="profile-image-input"
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageChange}
      />
      <button type="button" onClick={() => fileInputRef.current?.click()}>
        Change image
      </button>
      {profileImageUrl ? (
        <img alt="Profile image preview" src={profileImageUrl} />
      ) : null}

      <button
        type="button"
        onClick={handleSave}
      >
        Save
      </button>
      {showProfileNameError ? <p>Profile name is required</p> : null}
    </div>
  );
};
