import { describe, expect, it } from 'vitest';
import { shouldRedirectToLogin } from '@/lib/routeGuard';

describe('shouldRedirectToLogin', () => {
  it('redirects a protected route when there is no session cookie (26.1)', () => {
    expect(shouldRedirectToLogin('/', false)).toBe(true);
    expect(shouldRedirectToLogin('/saltwater', false)).toBe(true);
    expect(shouldRedirectToLogin('/freshwater', false)).toBe(true);
    expect(shouldRedirectToLogin('/explore', false)).toBe(true);
    expect(shouldRedirectToLogin('/contact', false)).toBe(true);
  });

  it('does not redirect a protected route when the session cookie is present (26.2)', () => {
    expect(shouldRedirectToLogin('/', true)).toBe(false);
    expect(shouldRedirectToLogin('/saltwater', true)).toBe(false);
    expect(shouldRedirectToLogin('/explore', true)).toBe(false);
  });

  it('does not redirect an auth route even when there is no session cookie (26.3)', () => {
    expect(shouldRedirectToLogin('/login', false)).toBe(false);
    expect(shouldRedirectToLogin('/signup', false)).toBe(false);
    expect(shouldRedirectToLogin('/verify', false)).toBe(false);
    expect(shouldRedirectToLogin('/reset-confirm', false)).toBe(false);
  });
});