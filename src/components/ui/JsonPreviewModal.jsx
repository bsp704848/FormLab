import Modal from './Modal';

export default function JsonPreviewModal({
  isOpen,
  onClose,
  onConfirm,
  jsonData
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="JSON Preview"
    >
      <div className="max-h-[400px] overflow-y-auto mb-4">
      <pre className="bg-gray-100 p-3 text-left text-xs sm:text-sm rounded overflow-x-auto whitespace-pre-wrap font-mono">
          {jsonData}
        </pre>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
