import { useState, useEffect } from 'react';
import { AlertTriangle, X, Lock, Unlock } from 'lucide-react';
import { COLORS } from '../constants/colors';

const RestrictResultAccessModal = ({
  isOpen,
  onClose,
  onConfirm,
  student,
  isRestricted = false,
  isLoading = false
}) => {
  const [restrictionMessage, setRestrictionMessage] = useState('');
  const defaultMessage = 'Your result access has been restricted. Please complete your school fees to view your results.';

  useEffect(() => {
    if (isOpen) {
      setRestrictionMessage(defaultMessage);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, isLoading, onClose]);

  const handleConfirm = () => {
    onConfirm(restrictionMessage);
  };

  if (!isOpen) return null;

  const actionText = isRestricted ? 'Restore Access' : 'Restrict Access';
  const title = isRestricted 
    ? 'Restore Result Access' 
    : 'Restrict Result Access';
  const message = isRestricted
    ? `Are you sure you want to restore result access for ${student?.first_name} ${student?.last_name}? They will be able to view their results again.`
    : `Are you sure you want to restrict result access for ${student?.first_name} ${student?.last_name}? They will not be able to view their results until access is restored.`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={!isLoading ? onClose : undefined}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 animate-slide-in-down">
          {/* Close button */}
          <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={onClose}
              disabled={isLoading}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Content */}
          <div className="sm:flex sm:items-start">
            <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${
              isRestricted ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {isRestricted ? (
                <Unlock className="h-6 w-6 text-green-600" aria-hidden="true" />
              ) : (
                <Lock className="h-6 w-6 text-red-600" aria-hidden="true" />
              )}
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {message}
                </p>
              </div>

              {/* Restriction message input - only show when restricting */}
              {!isRestricted && (
                <div className="mt-4">
                  <label htmlFor="restriction-message" className="block text-sm font-medium text-gray-700 mb-2">
                    Restriction Message (Optional)
                  </label>
                  <textarea
                    id="restriction-message"
                    rows={4}
                    value={restrictionMessage}
                    onChange={(e) => setRestrictionMessage(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    placeholder={defaultMessage}
                    disabled={isLoading}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    This message will be displayed to the student when they try to view their results. Leave blank to use the default message.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed ${
                isRestricted
                  ? 'bg-green-600 hover:bg-green-500 focus:ring-green-500'
                  : 'bg-red-600 hover:bg-red-500 focus:ring-red-500'
              }`}
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                actionText
              )}
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestrictResultAccessModal;

