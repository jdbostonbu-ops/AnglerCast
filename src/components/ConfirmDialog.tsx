'use client';

import type { ReactElement } from 'react';

type ConfirmDialogProps = {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps): ReactElement | null => {
  if (!isOpen) {
    return null;
  }

  return (
    <div role="dialog" aria-modal="true" aria-label={title ?? message}>
      {title ? <h2>{title}</h2> : null}
      <p>{message}</p>
      <button type="button" onClick={onConfirm}>
        {confirmLabel}
      </button>
      <button type="button" onClick={onCancel}>
        {cancelLabel}
      </button>
    </div>
  );
};
