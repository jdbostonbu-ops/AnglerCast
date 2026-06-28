import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
});