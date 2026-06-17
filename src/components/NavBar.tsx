'use client';

import type { ReactElement } from 'react';

type NavBarProps = {
  hideWaterLinks?: boolean;
  isLoggedIn?: boolean;
  onLogout?: () => void;
};

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Freshwater', href: '/freshwater' },
  { label: 'Saltwater', href: '/saltwater' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

const waterHrefs = ['/freshwater', '/saltwater'];

export const NavBar = ({
  hideWaterLinks = false,
  isLoggedIn = false,
  onLogout,
}: NavBarProps): ReactElement => {
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
        {isLoggedIn ? (
          <button type="button" onClick={onLogout}>
            Log out
          </button>
        ) : null}
      </div>
    </nav>
  );
};
