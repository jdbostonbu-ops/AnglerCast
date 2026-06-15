import type { ReactNode } from 'react';

export const metadata = {
  title: 'AnglerCast',
  description: 'What fish are where and when — from real public occurrence data.',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
