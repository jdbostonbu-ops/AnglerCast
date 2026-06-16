const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Freshwater', href: '/freshwater' },
  { label: 'Saltwater', href: '/saltwater' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const NavBar = () => (
  <nav aria-label="Main navigation" className="site-nav">
    <div className="site-nav__brand">
      <span className="site-nav__mark" aria-hidden="true">
        &#9875;
      </span>
      <span className="site-nav__name">AnglerCast</span>
    </div>
    <div className="site-nav__links">
      {navLinks.map((link) => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
    </div>
  </nav>
);
