import { FileJson, Save, CircleX, House } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ToolboxButtons({ onClear, onSaveHTML, onSaveJSON, className = '' }) {

  const navigate = useNavigate();

  return (
    <div className={`flex flex-row gap-2 sm:gap-3 ${className}`}>

<button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 px-2 py-2 sm:px-3 rounded-md text-indigo-600 hover:bg-indigo-200 text-[10px] sm:text-sm"
      >
        <House className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className='font-bold'>Home</span>
      </button>
      
      <button
        onClick={onClear}
        className="flex items-center gap-1 px-2 py-2 sm:px-3 rounded-md text-red-600 hover:bg-red-200 text-[10px] sm:text-sm"
      >
        <CircleX className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className='font-bold'>Clear</span>
      </button>
      <button
        onClick={onSaveHTML}
        className="flex items-center gap-1 px-2 py-2 sm:px-3 rounded-md text-blue-600 hover:bg-blue-200 text-[10px] sm:text-sm "
      >
        <Save className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className='font-bold'>HTML</span>
      </button>
      <button
        onClick={onSaveJSON}
        className="flex items-center gap-1 px-2 py-2 sm:px-3 rounded-md text-green-600 hover:bg-green-200 text-[10px] sm:text-sm "
      >
        <FileJson className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className='font-bold'>JSON</span>
      </button>
    </div>
  );
}
