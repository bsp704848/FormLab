import Modal from '../../components/ui/Modal';
import { Trash2, Ban } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion">
      <div className="space-y-4 text-center">
      <p className="text-md text-gray-900 font-bold">{message}</p>
      <div className="flex justify-center gap-2">
        <button
          onClick={onConfirm}
          className="flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
        >
          <Ban className="w-4 h-4" />
          Cancel
        </button>
        </div>
        </div>
    </Modal>
  );
}
