import React from 'react';
import { createPortal } from 'react-dom';
import { RenderButton } from './Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: 'primary' | 'danger';
  showCancel?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  isLoading = false,
  variant = 'primary',
  showCancel = true,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex justify-end gap-3">
          {showCancel && (
            <RenderButton
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelText}
            </RenderButton>
          )}
          <RenderButton
            variant="primary"
            onClick={onConfirm}
            isLoading={isLoading}
            className={variant === 'danger' ? "bg-red-600 hover:bg-red-700 border-red-600" : ""}
          >
            {confirmText}
          </RenderButton>
        </div>
      </div>
    </div>,
    document.body
  );
};
