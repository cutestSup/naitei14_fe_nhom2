import React from 'react';
import { RenderButton } from './Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading = false,
  confirmLabel = 'Xác nhận',
  cancelLabel = 'Hủy',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <RenderButton
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
            size="sm"
          >
            {cancelLabel}
          </RenderButton>
          <RenderButton
            variant="primary"
            onClick={onConfirm}
            isLoading={isLoading}
            size="sm"
          >
            {confirmLabel}
          </RenderButton>
        </div>
      </div>
    </div>
  );
};
