'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';

type ProfileFormProps = {
  onSave: (data: { profileName: string; profileImageUrl: string }) => void;
};

export const ProfileForm = ({ onSave }: ProfileFormProps): ReactElement => {
  const [profileName, setProfileName] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [showProfileNameError, setShowProfileNameError] = useState(false);

  const handleSave = (): void => {
    if (profileName.trim() === '') {
      setShowProfileNameError(true);
      return;
    }

    setShowProfileNameError(false);
    onSave({ profileName, profileImageUrl });
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

      <label htmlFor="profile-image-url">Image URL</label>
      <input
        id="profile-image-url"
        type="text"
        value={profileImageUrl}
        onChange={(event) => setProfileImageUrl(event.target.value)}
      />

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
