import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FreshwaterChat } from '@/components/FreshwaterChat';

describe('FreshwaterChat', () => {
  it('RED 38.27 — renders a labeled text input and a submit button on initial render', () => {
    render(<FreshwaterChat />);

    const input = screen.getByLabelText(/question/i);
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeInTheDocument();
  });

  describe('after submitting a question', () => {
    beforeEach(() => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () => ({ response: 'Did you mean Saturday, June 28?' }),
        }),
      );
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('RED 38.28 — displays the agent response after a successful submission', async () => {
      const user = userEvent.setup();
      render(<FreshwaterChat />);

      const input = screen.getByLabelText(/question/i);
      const submitButton = screen.getByRole('button');

      await user.type(input, 'Where should I fish this Saturday?');
      await user.click(submitButton);

      const responseText = await screen.findByText(/did you mean saturday/i);
      expect(responseText).toBeInTheDocument();
    });

    it('RED 38.29 — shows a spinner and disables the submit button while the fetch is in flight, then hides them after the response renders', async () => {
      let resolveFetch: (value: Response) => void = () => {};
      const fetchPromise = new Promise<Response>((resolve) => {
        resolveFetch = resolve;
      });
      vi.stubGlobal('fetch', vi.fn().mockReturnValue(fetchPromise));

      const user = userEvent.setup();
      render(<FreshwaterChat />);

      const input = screen.getByLabelText(/question/i);
      const submitButton = screen.getByRole('button');

      await user.type(input, 'Where should I fish?');
      await user.click(submitButton);

      const spinner = await screen.findByRole('status');
      expect(spinner).toBeInTheDocument();
      expect(submitButton).toBeDisabled();

      resolveFetch({
        ok: true,
        json: async () => ({ response: 'Did you mean Saturday, June 28?' }),
      } as Response);

      const responseText = await screen.findByText(/did you mean saturday/i);
      expect(responseText).toBeInTheDocument();
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });
});

