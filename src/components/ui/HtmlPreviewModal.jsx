import Modal from './Modal';
import {toast} from 'react-hot-toast'

export default function HtmlPreviewModal({
  isOpen,
  onClose,
  onConfirm,
  htmlData,
}) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlData);
    toast.success('HTML copied to clipboard!');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Preview Your Form"
    >

      <div className="overflow-auto max-h-[60vh] border p-4 bg-white">
        <iframe
          title="Form Preview"
          srcDoc={htmlData}
          className="w-full h-[400px] border rounded"
        />
      </div>

 
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Copy HTML
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save HTML
        </button>
      </div>
    </Modal>
  );
}
