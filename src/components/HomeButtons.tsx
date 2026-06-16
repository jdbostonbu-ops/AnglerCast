const homeButtons = [
  { label: 'Freshwater', href: '/freshwater' },
  { label: 'Saltwater', href: '/saltwater' },
] as const;

export const HomeButtons = () => (
  <div>
    {homeButtons.map((button) => (
      <a key={button.href} href={button.href}>
        {button.label}
      </a>
    ))}
  </div>
);
