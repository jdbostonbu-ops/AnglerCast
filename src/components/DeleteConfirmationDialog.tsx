'use client';

import { useState } from 'react';

type DeleteConfirmationDialogProps = {
  spotName: string;
  onConfirmDelete: () => void;
};

export const DeleteConfirmationDialog = ({
  spotName,
  onConfirmDelete,
}: DeleteConfirmationDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    onConfirmDelete();
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={openDialog}>
        Delete
      </button>

      {isDialogOpen ? (
        <div role="dialog" aria-modal="true" aria-labelledby="delete-confirmation-title">
          <h2 id="delete-confirmation-title">Delete saved spot</h2>
          <p>{spotName}</p>
          <button type="button" onClick={confirmDelete}>
            Confirm
          </button>
          <button type="button" onClick={cancelDelete}>
            Cancel
          </button>
        </div>
      ) : null}
    </div>
  );
};
