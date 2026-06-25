'use client';

import type { ReactElement } from 'react';

type ProfileFormProps = {
  onSave: (data: { profileName: string; profileImageUrl: string }) => void;
};

export const ProfileForm = ({ onSave }: ProfileFormProps): ReactElement => (
  <div>
    <label htmlFor="profile-name">Profile name</label>
    <input id="profile-name" type="text" />

    <label htmlFor="profile-image-url">Image URL</label>
    <input id="profile-image-url" type="text" />

    <button type="button">Save</button>
  </div>
);
