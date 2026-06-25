import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavBar } from '@/components/NavBar';

describe('NavBar', () => {

it('renders the AnglerCast brand name', () => {
    render(<NavBar />);
    expect(screen.getByText('AnglerCast')).toBeInTheDocument();
  });

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

  it('renders the profile avatar image and display name on the right when a profile is set', () => {
    render(
      <NavBar
        isLoggedIn
        profile={{
          profileName: 'trigger',
          profileImageUrl: 'https://images.example.com/profiles/trigger.jpg',
          email: 'jdboston@example.com',
        }}
      />,
    );

    const avatar = screen.getByRole('img', { name: /profile avatar/i });
    expect(avatar).toHaveAttribute(
      'src',
      'https://images.example.com/profiles/trigger.jpg',
    );

    expect(screen.getByText('trigger')).toBeInTheDocument();
  });

  it('renders the letter avatar and display name when no profile image is set', () => {
    render(
      <NavBar
        isLoggedIn
        profile={{
          profileName: 'trigger',
          profileImageUrl: null,
          email: 'jdboston@example.com',
        }}
      />,
    );

    expect(screen.queryByRole('img', { name: /profile avatar/i })).toBeNull();
    expect(screen.getByText('J')).toBeInTheDocument();
    expect(screen.getByText('trigger')).toBeInTheDocument();
  });

  it('renders a "Set up profile" prompt when the user is logged in but has no profile name', () => {
    render(<NavBar isLoggedIn />);

    expect(
      screen.getByRole('link', { name: /set up profile/i }),
    ).toHaveAttribute('href', '/profile');

    expect(screen.queryByRole('img', { name: /profile avatar/i })).toBeNull();
  });

  it('renders a pencil edit link to /profile next to the avatar when a profile is set', () => {
    render(
      <NavBar
        isLoggedIn
        profile={{
          profileName: 'trigger',
          profileImageUrl: '/uploads/abc.png',
          email: 'jdboston@example.com',
        }}
      />,
    );

    const editLink = screen.getByRole('link', { name: /edit profile/i });
    expect(editLink).toHaveAttribute('href', '/profile');
  });
});