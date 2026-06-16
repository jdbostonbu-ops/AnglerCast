import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DeleteConfirmationDialog } from '@/components/DeleteConfirmationDialog';

describe('DeleteConfirmationDialog', () => {
  it('opens a confirmation dialog and deletes only after confirming', async () => {
    const user = userEvent.setup();
    const handleConfirmDelete = vi.fn();

    render(
      <DeleteConfirmationDialog
        spotName="Montauk Point"
        onConfirmDelete={handleConfirmDelete}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Delete' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Montauk Point')).toBeInTheDocument();
    expect(handleConfirmDelete).not.toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: 'Confirm' }));

    expect(handleConfirmDelete).toHaveBeenCalledTimes(1);
  });

  it('closes the confirmation dialog without deleting when canceled', async () => {
    const user = userEvent.setup();
    const handleConfirmDelete = vi.fn();

    render(
      <DeleteConfirmationDialog
        spotName="Montauk Point"
        onConfirmDelete={handleConfirmDelete}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Delete' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(handleConfirmDelete).not.toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
