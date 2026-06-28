import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SaltwaterChat } from '@/components/SaltwaterChat';

describe('SaltwaterChat', () => {
  it('renders a labeled text input and a submit button on initial render', () => {
    render(<SaltwaterChat />);

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

    it('displays the agent response after a successful submission', async () => {
      const user = userEvent.setup();
      render(<SaltwaterChat />);

      const input = screen.getByLabelText(/question/i);
      const submitButton = screen.getByRole('button');

      await user.type(input, 'Where should I fish this Saturday?');
      await user.click(submitButton);

      const responseText = await screen.findByText(/did you mean saturday/i);
      expect(responseText).toBeInTheDocument();
    });

     it('shows a spinner and disables the submit button while the fetch is in flight, then hides them after the response renders', async () => {
      let resolveFetch: (value: Response) => void = () => {};
      const fetchPromise = new Promise<Response>((resolve) => {
        resolveFetch = resolve;
      });
      vi.stubGlobal('fetch', vi.fn().mockReturnValue(fetchPromise));

      const user = userEvent.setup();
      render(<SaltwaterChat />);

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

    it('sends prior conversation history with each follow-up request', async () => {
      const fetchMock = vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ response: 'Did you mean Saturday, June 28?' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ response: 'High tide is at 7:48 AM.' }),
        });
      vi.stubGlobal('fetch', fetchMock);

      const user = userEvent.setup();
      render(<SaltwaterChat />);

      const input = screen.getByLabelText(/question/i);
      const submitButton = screen.getByRole('button');

      await user.type(input, 'Where should I fish this Saturday?');
      await user.click(submitButton);

      await screen.findByText(/did you mean saturday/i);

      await user.clear(input);
      await user.type(input, 'Yes, June 28');
      await user.click(submitButton);

      await screen.findByText(/high tide is at/i);

      const secondCallArgs = fetchMock.mock.calls[1];
      const requestInit = secondCallArgs?.[1] as RequestInit;
      expect(requestInit).toBeDefined();
      const body = JSON.parse(requestInit.body as string) as {
        question: string;
        history?: unknown[];
      };

      expect(body.question).toBe('Yes, June 28');
      expect(Array.isArray(body.history)).toBe(true);
      expect(body.history?.length).toBeGreaterThanOrEqual(2);

      const historyText = JSON.stringify(body.history);
      expect(historyText).toContain('Where should I fish this Saturday?');
      expect(historyText).toContain('Did you mean Saturday, June 28?');
    });
  });
});

