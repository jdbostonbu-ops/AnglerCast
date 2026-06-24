import { test, expect } from '@playwright/test';

const BASE = 'https://www.anglercast.fyi';

const PROTECTED_ROUTES = ['/', '/freshwater', '/saltwater', '/explore', '/contact'];
const PUBLIC_ROUTES = ['/login', '/signup'];

test.describe('Auth gate — logged-out user', () => {
  // Make sure every test in this file starts with no cookies / no session.
  test.use({ storageState: { cookies: [], origins: [] } });

  for (const path of PROTECTED_ROUTES) {
    test(`redirects ${path} to /login`, async ({ page }) => {
      await page.goto(`${BASE}${path}`);
      // After redirect, the URL should end with /login
      await expect(page).toHaveURL(/\/login$/);
      // And the page should actually show the login form
      await expect(page.getByRole('heading', { name: /log in/i })).toBeVisible();
      // Critical: protected content must NOT be in the rendered page
      await expect(page.getByText(/Top recorded spots by season/i)).not.toBeVisible();
    });
  }

  for (const path of PUBLIC_ROUTES) {
    test(`allows access to ${path}`, async ({ page }) => {
      await page.goto(`${BASE}${path}`);
      await expect(page).toHaveURL(`${BASE}${path}`);
    });
  }
});
