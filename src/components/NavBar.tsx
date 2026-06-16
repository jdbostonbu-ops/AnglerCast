const navLinks = [
  { label: 'Freshwater', href: '/freshwater' },
  { label: 'Saltwater', href: '/saltwater' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const NavBar = () => (
  <nav aria-label="Main navigation">
    {navLinks.map((link) => (
      <a key={link.href} href={link.href}>
        {link.label}
      </a>
    ))}
  </nav>
);
