import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ExploreFaqChat } from '@/components/ExploreFaqChat';

describe('ExploreFaqChat', () => {
  it('renders a labeled text input for the user question', () => {
    render(<ExploreFaqChat />);

    const input = screen.getByLabelText(/question/i);

    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
  });

  it('renders a submit button', () => {
    render(<ExploreFaqChat />);

    const submitButton = screen.getByRole('button', { name: /ask/i });

    expect(submitButton).toBeInTheDocument();
  });

  describe('after submitting a question', () => {
    beforeEach(() => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () => ({
            answer: 'Sighting rate measures how often a species is recorded in records.',
            sources: ['How Sighting Rate Works'],
          }),
        }),
      );
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('displays the answer returned from the API', async () => {
      const user = userEvent.setup();
      render(<ExploreFaqChat />);

      const input = screen.getByLabelText(/question/i);
      const submitButton = screen.getByRole('button', { name: /ask/i });

      await user.type(input, 'What is sighting rate?');
      await user.click(submitButton);

      const answer = await screen.findByText(
        /sighting rate measures how often a species is recorded in records/i,
      );

      expect(answer).toBeInTheDocument();
    });
  });
});

