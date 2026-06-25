'use client';

import { useEffect, useState, type ReactElement } from 'react';

import { NavBar } from '@/components/NavBar';


type SiteNavProps = {
  hideWaterLinks?: boolean;
};

type AuthResponse = {
  userId: string | null;
};

type ProfileResponse = {
  profileName: string | null;
  profileImageUrl: string | null;
  email: string;
};

export const SiteNav = ({
  hideWaterLinks = false,
}: SiteNavProps): ReactElement => {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);


  useEffect(() => {
    const loadCurrentUser = async (): Promise<void> => {
      const response = await fetch('/api/auth/me');
      const body = (await response.json()) as AuthResponse;

      setUserId(body.userId);

      if (body.userId === null) {
        setProfile(null);
        window.location.href = '/login';
        return;
      }

      const profileResponse = await fetch('/api/profile');

      if (profileResponse.ok) {
        const fetchedProfile = (await profileResponse.json()) as ProfileResponse;

        setProfile(fetchedProfile);
      }
    };

    void loadCurrentUser();
    }, []);

  const handleLogout = async (): Promise<void> => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUserId(null);
    setProfile(null);
    window.location.href = '/login';
  };

  return (
    <NavBar
      hideWaterLinks={hideWaterLinks}
      isLoggedIn={userId !== null}
      onLogout={handleLogout}
      profile={
        profile?.profileName
          ? {
              profileName: profile.profileName,
              profileImageUrl: profile.profileImageUrl,
              email: profile.email,
            }
          : undefined
      }
    />
  );
};
