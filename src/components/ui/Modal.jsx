import { Dialog } from '@headlessui/react';
import { CircleX } from 'lucide-react';

const { Panel: DialogPanel, Title: DialogTitle } = Dialog;

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <Dialog
      open={!!isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center backdrop-blur-sm justify-center p-4 text-center">
        <DialogPanel
         className="
         w-full
         max-w-lg 
         bg-white
         rounded-xl
         shadow-2xl
         p-5
         sm:p-6
         overflow-y-auto
         max-h-[90vh]
       "
        >
          <div className="flex items-center justify-between mb-4">
            {title && (
              <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                {title}
              </DialogTitle>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 transition"
            >
              <CircleX className="w-5 h-5" />
            </button>
          </div>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

