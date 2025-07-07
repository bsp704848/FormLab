/* eslint-disable no-unused-vars */
import { useDraggable } from '@dnd-kit/core'
import {
    LetterText, Text as TextArea, BadgeCheck, CircleCheck, MousePointer2, CalendarDays,
    ClipboardCheck, PilcrowRight, Heading, CirclePower, Upload, ArrowUp10
} from 'lucide-react'

const toolboxItems = [
    { id: 'text', label: 'Text Field', icon: LetterText, color: 'text-blue-600' },
    { id: 'textarea', label: 'Textarea', icon: TextArea, color: 'text-green-600' },
    { id: 'checkbox', label: 'Checkbox', icon: BadgeCheck, color: 'text-red-600'},
    { id: 'radio', label: 'Radio', icon: CircleCheck, color: 'text-emerald-600'},
    { id: 'select', label: 'Select', icon: ClipboardCheck, color: 'text-yellow-600'},
    { id: 'autocomplete', label: 'Autocomplete', icon: MousePointer2, color: 'text-pink-600'},
    { id: 'date', label: 'Date Field', icon: CalendarDays, color: 'text-sky-600'},
    { id: 'paragraph', label: 'Paragraph', icon: PilcrowRight, color: 'text-gray-600'},
    { id: 'header', label: 'Header', icon: Heading, color: 'text-orange-600'},
    { id: 'button', label: 'Button', icon: CirclePower, color: 'text-purple-600'},
    { id: 'number', label: 'Number Field', icon: ArrowUp10, color: 'text-amber-700'},
    { id: 'file', label: 'File Upload', icon: Upload, color: 'text-lime-600'},
];

function DraggableItem({ id, label, icon: Icon, color }) {
    const { attributes, listeners, setNodeRef } = useDraggable({ id });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`flex items-center gap-1 sm:gap-2 px-2 py-2 sm:px-3 rounded-md $ hover:bg-blue-100 cursor-move transition-all duration-300 ease-in-out min-w-[90px] sm:min-w-[120px]`}
        >
            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color} shrink-0`} />
            <span className={`text-[10px] sm:text-sm text-gray-900 font-medium truncate`}>{label}</span>
        </div>
    );
}

export default function Toolbox() {
    return (
        <div className="flex sm:flex-col flex-row sm:space-y-2 space-x-4 sm:space-x-1 overflow-x-auto sm:overflow-visible p-4  sm:p-0">
            {toolboxItems.map((item) => (
                <DraggableItem key={item.id} {...item} />
            ))}
        </div>
    );
}

