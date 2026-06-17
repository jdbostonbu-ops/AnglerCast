'use client';

import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { NavBar } from '@/components/NavBar';

type SiteNavProps = {
  hideWaterLinks?: boolean;
};

type CurrentUserResponse = {
  userId: string | null;
};

export const SiteNav = ({ hideWaterLinks }: SiteNavProps): ReactElement => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadCurrentUser = async (): Promise<void> => {
      const response = await fetch('/api/auth/me');
      const currentUser = (await response.json()) as CurrentUserResponse;

      setUserId(currentUser.userId);
    };

    void loadCurrentUser();
  }, []);

  const handleLogout = async (): Promise<void> => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
    setUserId(null);
    window.location.href = '/';
  };

  return (
    <NavBar
      hideWaterLinks={hideWaterLinks}
      isLoggedIn={userId !== null}
      onLogout={handleLogout}
    />
  );
};
