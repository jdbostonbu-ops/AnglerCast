import type { ReactElement } from 'react';

export const Spinner = (): ReactElement => (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-block',
      width: '14px',
      height: '14px',
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'anglercast-spin 0.6s linear infinite',
      verticalAlign: 'middle',
    }}
  >
    <style>{`@keyframes anglercast-spin { to { transform: rotate(360deg); } }`}</style>
  </span>
);
