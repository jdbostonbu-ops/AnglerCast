import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavBar } from '@/components/NavBar';

describe('NavBar', () => {
  it('renders Home,Freshwater, Saltwater, Explore, and Contact links', () => {
    render(<NavBar />);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');

    expect(screen.getByRole('link', { name: 'Freshwater' })).toHaveAttribute(
      'href',
      '/freshwater',
    );
    expect(screen.getByRole('link', { name: 'Saltwater' })).toHaveAttribute(
      'href',
      '/saltwater',
    );
    expect(screen.getByRole('link', { name: 'Explore' })).toHaveAttribute('href', '/explore');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  it('shows a Log out button when isLoggedIn is true', () => {
    render(<NavBar isLoggedIn onLogout={() => {}} />);
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
  });

  it('does not show a Log out button when isLoggedIn is false', () => {
    render(<NavBar isLoggedIn={false} onLogout={() => {}} />);
    expect(screen.queryByRole('button', { name: /log out/i })).toBeNull();
  });

  it('calls onLogout when the Log out button is clicked', () => {
    const onLogout = vi.fn();
    render(<NavBar isLoggedIn onLogout={onLogout} />);
    fireEvent.click(screen.getByRole('button', { name: /log out/i }));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});