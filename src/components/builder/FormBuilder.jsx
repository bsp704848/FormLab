import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import Toolbox from './Toolbox';
import Canvas from './Canvas';
import FieldEditor from '../editor/FieldEditor';
import ConfirmModal from '../../components/ui/ConfirmModal';
import { useFormStore } from '../../store/useFormStore';

export default function FormBuilder() {
  const fields = useFormStore((state) => state.fields);
  const addField = useFormStore((state) => state.addField);
  const updateField = useFormStore((state) => state.updateField);
  const removeField = useFormStore((state) => state.removeField);
  const setFields = useFormStore((state) => state.setFields);

  const [activeId, setActiveId] = useState(null);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteFieldId, setDeleteFieldId] = useState(null);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;
    setActiveId(null);
    if (over?.id === 'canvas') {
      addField({
        id: nanoid(),
        type: active.id,
        props: getDefaultProps(active.id),
        style: {},
      });
    }
  };

  const handleEdit = (fieldId) => {
    setSelectedFieldId(fieldId);
    setIsEditOpen(true);
  };

  const handleMoveUp = (fieldId) => {
    const index = fields.findIndex((f) => f.id === fieldId);
    if (index > 0) {
      const newFields = [...fields];
      [newFields[index - 1], newFields[index]] = [newFields[index], newFields[index - 1]];
      setFields(newFields);
    }
  };

  const handleMoveDown = (fieldId) => {
    const index = fields.findIndex((f) => f.id === fieldId);
    if (index < fields.length - 1) {
      const newFields = [...fields];
      [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
      setFields(newFields);
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col-reverse sm:flex-row h-screen overflow-hidden">

        <div className="sm:w-1/6 w-full sm:h-full h-24 border-t sm:border-t-0 sm:border-r bg-white p-2 sm:p-4 flex sm:flex-col flex-row sm:space-y-4 space-x-2 sm:space-x-0 overflow-auto">
          <Toolbox />
        </div>

        <div className="flex-1 overflow-auto bg-gray-50">
          <Canvas
            fields={fields}
            setFields={setFields}
            onSelectField={setSelectedFieldId}
            onEdit={handleEdit}
            onDelete={setDeleteFieldId}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
          />
        </div>

        <FieldEditor
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          field={fields.find((f) => f.id === selectedFieldId)}
          updateField={updateField}
        />

        <ConfirmModal
          isOpen={!!deleteFieldId}
          onClose={() => setDeleteFieldId(null)}
          onConfirm={() => {
            removeField(deleteFieldId);
            if (selectedFieldId === deleteFieldId) setSelectedFieldId(null);
            setDeleteFieldId(null);
          }}
          message="Are you sure you want to delete this field?"
        />
      </div>

      <DragOverlay>
        {activeId && <div className="p-2 bg-gray-300 rounded shadow text-sm">{activeId}</div>}
      </DragOverlay>
    </DndContext>
  );
}

const getDefaultProps = (type) => {
  switch (type) {
    case 'text':
      return {
        label: 'Text Field',
        placeholder: 'Enter text',
        required: false,
      };
    case 'textarea':
      return {
        label: 'Textarea',
        placeholder: 'Enter details',
        rows: 4,
      };
      case 'checkbox':
        return {
          label: 'Select Options',
          name: `checkbox-${nanoid()}`,
          options: ['Option 1', 'Option 2'],
          checked: [],
          required: false,
        };
      
    case 'radio':
      return {
        label: 'Choose Option',
        name: `radio-${nanoid()}`,
        options: [
          { label: 'Yes', value: 'Yes' },
          { label: 'No', value: 'No' }
        ],
        
      };
      case 'select':
        return {
          label: 'Select Option',
          name: `select-${nanoid()}`,
          options: [
            { label: 'Option 1', value: 'Option 1' },
            { label: 'Option 2', value: 'Option 2' }
          ],
          multiple: false,
          required: false,
        };
      
    case 'autocomplete':
      return {
        label: 'Search Options',
        options: ['Item 1', 'Item 2'],
      };
    case 'date':
      return {
        label: 'Pick a Date',
        required: false,
      };
    case 'paragraph':
      return {
        text: 'This is a paragraph block.',
      };
    case 'header':
      return {
        text: 'Form Header',
        level: 2,
      };
    case 'button':
      return {
        label: 'Submit',
        type: 'submit',
      };
    default:
      return {};
  }
};

































