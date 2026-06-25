'use client';

import type { ReactElement } from 'react';
import { getDisplayAvatar } from '@/lib/profile';

type NavBarProps = {
  hideWaterLinks?: boolean;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  profile?: {
    profileName: string;
    profileImageUrl: string | null;
    email: string;
  };
};

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Freshwater', href: '/freshwater' },
  { label: 'Saltwater', href: '/saltwater' },
  { label: 'Explore', href: '/explore' },
  { label: 'Contact', href: '/contact' },
] as const;

const waterHrefs = ['/freshwater', '/saltwater'];

export const NavBar = ({
  hideWaterLinks = false,
  isLoggedIn = false,
  onLogout,
  profile,
}: NavBarProps): ReactElement => {
  const links = hideWaterLinks
    ? navLinks.filter((link) => !waterHrefs.includes(link.href))
    : navLinks;
  const hasProfileName = Boolean(profile?.profileName);
  const shouldShowProfileSetup = isLoggedIn && !hasProfileName;
  const displayAvatar = profile && hasProfileName
    ? getDisplayAvatar({
        profileImageUrl: profile.profileImageUrl,
        email: profile.email,
      })
    : null;

  return (
    <nav aria-label="Main navigation" className="site-nav">
      <div className="site-nav__brand">
        <span className="site-nav__mark" aria-hidden="true">
          &#9875;
        </span>
        <span className="site-nav__name">AnglerCast</span>
      </div>
      <div className="site-nav__right">
        <div className="site-nav__links">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          {isLoggedIn ? (
            <button type="button" onClick={onLogout}>
              Log out
            </button>
          ) : null}
        </div>
        {profile && hasProfileName ? (
          <div className="site-nav__profile">
            {displayAvatar?.kind === 'image' ? (
              <img alt="Profile avatar" src={displayAvatar.src} />
            ) : null}
            {displayAvatar?.kind === 'letter' ? (
              <span className="site-nav__avatar-letter">{displayAvatar.letter}</span>
            ) : null}
            <span>{profile.profileName}</span>
          </div>
        ) : null}
        {shouldShowProfileSetup ? (
          <div className="site-nav__profile">
            <a href="/">Set up profile</a>
          </div>
        ) : null}
      </div>
    </nav>
  );
};
