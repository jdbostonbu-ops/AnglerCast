import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmDialog } from '@/components/ConfirmDialog';

describe('ConfirmDialog', () => {
  it('calls onConfirm exactly once when confirm is clicked', () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(
      <ConfirmDialog isOpen message="Delete this saved spot?" onConfirm={onConfirm} onCancel={onCancel} />,
    );
    fireEvent.click(screen.getByRole('button', { name: /confirm/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('calls onCancel and not onConfirm when cancel is clicked', () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(
      <ConfirmDialog isOpen message="Delete this saved spot?" onConfirm={onConfirm} onCancel={onCancel} />,
    );
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('renders nothing when closed', () => {
    render(
      <ConfirmDialog isOpen={false} message="Delete this saved spot?" onConfirm={vi.fn()} onCancel={vi.fn()} />,
    );
    expect(screen.queryByText('Delete this saved spot?')).toBeNull();
  });
});