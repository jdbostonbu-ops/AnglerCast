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

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Freshwater', href: '/freshwater' },
  { label: 'Saltwater', href: '/saltwater' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

const waterHrefs = ['/freshwater', '/saltwater'];

export const SiteNav = ({ hideWaterLinks }: SiteNavProps): ReactElement => {
  const [userId, setUserId] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const loadCurrentUser = async (): Promise<void> => {
      const response = await fetch('/api/auth/me');
      const currentUser = (await response.json()) as CurrentUserResponse;

      setUserId(currentUser.userId);

      if (currentUser.userId === null) {
        window.location.href = '/login';
      }
    };

    void loadCurrentUser();
  }, []);

  const handleLogout = async (): Promise<void> => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
    setUserId(null);
    window.location.href = '/login';
  };

  if (userId !== null) {
    return (
      <NavBar
        hideWaterLinks={hideWaterLinks}
        isLoggedIn={userId !== undefined}
        onLogout={handleLogout}
      />
    );
  }

  const links = hideWaterLinks
    ? navLinks.filter((link) => !waterHrefs.includes(link.href))
    : navLinks;

  return (
    <nav aria-label="Main navigation" className="site-nav">
      <div className="site-nav__brand">
        <span className="site-nav__mark" aria-hidden="true">
          &#9875;
        </span>
        <span className="site-nav__name">AnglerCast</span>
      </div>
      <div className="site-nav__links">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};
