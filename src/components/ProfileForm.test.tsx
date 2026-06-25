import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ProfileForm } from '@/components/ProfileForm';

const noopUpload = async (): Promise<string> => '';

describe('ProfileForm rendering', () => {
  it('renders a profile name field, an image picker control, and a Save button', () => {
    render(<ProfileForm onSave={() => {}} uploadImage={noopUpload} />);

    expect(screen.getByLabelText(/profile name/i)).toBeInTheDocument();
    // The pencil button that opens the image picker
    expect(
      screen.getByRole('button', { name: /change image/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('does not render an image URL text field', () => {
    render(<ProfileForm onSave={() => {}} uploadImage={noopUpload} />);

    expect(screen.queryByLabelText(/image url/i)).toBeNull();
  });
});

describe('ProfileForm image upload', () => {
  it('calls uploadImage with the picked file when an image is selected', async () => {
    const uploadImage = vi.fn().mockResolvedValue('/uploads/abc.png');

    render(<ProfileForm onSave={() => {}} uploadImage={uploadImage} />);

    const file = new File([new Uint8Array([1, 2, 3])], 'photo.png', {
      type: 'image/png',
    });

    const input = screen.getByTestId('profile-image-input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    expect(uploadImage).toHaveBeenCalledTimes(1);
    expect(uploadImage).toHaveBeenCalledWith(file);
  });
});

describe('ProfileForm submit', () => {
  it('calls onSave with the profile name and the uploaded image path', async () => {
    const onSave = vi.fn();
    const uploadImage = vi.fn().mockResolvedValue('/uploads/abc.png');

    render(<ProfileForm onSave={onSave} uploadImage={uploadImage} />);

    fireEvent.change(screen.getByLabelText(/profile name/i), {
      target: { value: 'trigger' },
    });

    const file = new File([new Uint8Array([1, 2, 3])], 'photo.png', {
      type: 'image/png',
    });
    const input = screen.getByTestId('profile-image-input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    // let the upload promise resolve so the path is stored
   // let the upload promise resolve and the state update flush
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith({
      profileName: 'trigger',
      profileImageUrl: '/uploads/abc.png',
    });
  });

  it('calls onSave with an empty image path when no image was picked', () => {
    const onSave = vi.fn();

    render(<ProfileForm onSave={onSave} uploadImage={noopUpload} />);

    fireEvent.change(screen.getByLabelText(/profile name/i), {
      target: { value: 'trigger' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith({
      profileName: 'trigger',
      profileImageUrl: '',
    });
  });
});

describe('ProfileForm empty name validation', () => {
  it('shows an error and does not call onSave when the profile name is empty', () => {
    const onSave = vi.fn();

    render(<ProfileForm onSave={onSave} uploadImage={noopUpload} />);

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(onSave).not.toHaveBeenCalled();
    expect(screen.getByText(/profile name is required/i)).toBeInTheDocument();
  });

  it('does not show the error once a valid name is entered and saved', () => {
    const onSave = vi.fn();

    render(<ProfileForm onSave={onSave} uploadImage={noopUpload} />);

    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.getByText(/profile name is required/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/profile name/i), {
      target: { value: 'trigger' },
    });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/profile name is required/i)).toBeNull();
  });
});

describe('ProfileForm image preview', () => {
  it('shows a preview image of the uploaded file after an image is picked', async () => {
    const uploadImage = vi.fn().mockResolvedValue('/uploads/abc.png');

    render(<ProfileForm onSave={() => {}} uploadImage={uploadImage} />);

    const file = new File([new Uint8Array([1, 2, 3])], 'photo.png', {
      type: 'image/png',
    });
    const input = screen.getByTestId('profile-image-input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    // let the upload resolve and state flush
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    const preview = screen.getByRole('img', { name: /profile image preview/i });
    expect(preview).toHaveAttribute('src', '/uploads/abc.png');
  });

  it('does not show a preview image before any file is picked', () => {
    render(<ProfileForm onSave={() => {}} uploadImage={async () => ''} />);

    expect(
      screen.queryByRole('img', { name: /profile image preview/i }),
    ).toBeNull();
  });
});