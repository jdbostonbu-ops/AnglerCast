import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
});