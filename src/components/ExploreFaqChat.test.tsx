import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
});