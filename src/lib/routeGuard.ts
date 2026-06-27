const exemptPathPrefixes = [
  '/login',
  '/signup',
  '/verify',
  '/reset-request',
  '/reset-confirm',
  '/api/auth',
];

export const shouldRedirectToLogin = (
  pathname: string,
  hasSessionCookie: boolean,
): boolean => {
  const isExemptRoute = exemptPathPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isExemptRoute) {
    return false;
  }

  return !hasSessionCookie;
};
