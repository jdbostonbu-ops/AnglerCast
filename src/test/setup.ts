import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';

// Per AGENTS.md: unit tests MUST mock fetch and never touch the network.
// A default stub is installed here so an un-mocked fetch fails loudly instead
// of silently hitting the network. Individual tests override this as needed.
beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => {
      throw new Error('Network call attempted in a unit test. Mock fetch in this test.');
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
