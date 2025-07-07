import { useDroppable } from '@dnd-kit/core';
import { fieldRegistry } from '../fields/fieldRegistry';
import FieldWrapper from './FieldWrapper';
import { Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import ToolboxButtons from '../editor/ToolBoxButtons';
import { saveForm, updateForm } from '../../utils/formsApi';
import renderFormAsHTML from '../../utils/renderFormAsHTML';
import JsonPreviewModal from '../ui/JsonPreviewModal';
import { useState } from 'react';
import HtmlPreviewModal from '../ui/HtmlPreviewModal';
import { toast, Toaster } from 'react-hot-toast'
import { useFormStore } from '../../store/useFormStore';
import { useNavigate } from 'react-router-dom';
import Loader from '../ui/Loader';

export default function Canvas({
  fields,
  setFields,
  onSelectField,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {

  const { setNodeRef, isOver } = useDroppable({ id: 'canvas' });
  const [jsonPreviewOpen, setJsonPreviewOpen] = useState(false);
  const [jsonString, setJsonString] = useState('');
  const [htmlPreviewOpen, setHtmlPreviewOpen] = useState(false);
  const [htmlString, setHtmlString] = useState('');
  const updateField = useFormStore((state) => state.updateField);
  const [loading, setLoading] = useState(false);
  const editingFormId = useFormStore((state) => state.editingFormId);
  const navigate = useNavigate()
  const formName = useFormStore((state) => state.formName);
  const setFormName = useFormStore((state) => state.setFormName);

  const handleClear = () => {
    setFields([]);
    setFormName(""); 
  };

  const handleSaveJSON = async () => {
    try {
      const jsonData = JSON.stringify(fields, null, 2);
      setJsonString(jsonData);
      setJsonPreviewOpen(true);
    } catch (error) {
      console.error(error);
      toast.error('Error preparing JSON preview.');
    }
  };

  const confirmSaveJSON = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const formName = useFormStore.getState().formName;


      if (!userId) {
        console.error("Cannot save JSON: userId not found!");
        toast.error("Error saving JSON. User not logged in.");
        return;
      }

      const payload = {
        json: jsonString,
         html: htmlString,
        userId,
        name: formName || "Untitled Form",
      };

      setLoading(true);

      let saved;
      if (editingFormId) {
        saved = await updateForm(editingFormId, payload);
      } else {
        saved = await saveForm(payload);
      }

      console.log('Saved JSON:', saved);
      toast.success('Form saved successfully as JSON!');

      setTimeout(() => {
        navigate('/myForms');
      }, 2000);

    } catch (error) {
      console.error(error);
      toast.error('Error saving JSON.');
    } finally {
      setJsonPreviewOpen(false);
    }
  };

  const handleSaveHTML = () => {
    try {
      const html = renderFormAsHTML(fields);
      setHtmlString(html);
      setHtmlPreviewOpen(true);
    } catch (error) {
      console.error(error);
      toast.error('Error generating HTML.');
    }
  };

  const confirmSaveHTML = async () => {
    try {

      const userId = localStorage.getItem("userId");
      const formName = useFormStore.getState().formName;

      if (!userId) {
        console.error("Cannot save HTML: userId not found!");
        toast.error("Error saving HTML. User not logged in.");
        return;
      }

      const payload = {
        json: jsonString,
         html: htmlString,
        userId,
        name: formName || "Untitled Form",
      };

      setLoading(true);

      let saved;
      if (editingFormId) {
        saved = await updateForm(editingFormId, payload);
      } else {
        saved = await saveForm(payload);
      }


      console.log('Saved HTML:', saved);
      toast.success('Form saved successfully as HTML!');

      setTimeout(() => {
        navigate('/myForms');
      }, 2000);

    } catch (error) {
      console.error(error);
      toast.error('Error saving HTML.');
    } finally {
      setHtmlPreviewOpen(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      id="canvas"
      className={`relative min-h-screen w-full transition-all duration-150 px-2 sm:px-4 ${isOver ? 'bg-blue-100' : 'bg-gray-100'
        }`}
    >

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 gap-2 sm:gap-0">
        <div className="sm:order-2">
          <ToolboxButtons
            onClear={handleClear}
            onSaveHTML={handleSaveHTML}
            onSaveJSON={handleSaveJSON}
          />
        </div>

        <div className="flex-grow sm:order-1">
          <input
            type="text"
            placeholder="Enter form name..."
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="w-full max-w-md border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 text-gray-700 text-sm"
          />
        </div>
      </div>

      <div className="h-16"></div>

      {fields.length === 0 && (
        <div className="p-4 h-[400px]">
          <div className="flex justify-center items-center h-full">
            <h2 className="text-center font-semibold text-lg sm:text-sm text-gray-900">
              Drag a field from the left to this area.
            </h2>
          </div>
        </div>
      )}

      {fields.map((field) => {

        const Component = fieldRegistry[field.type];
        if (!Component) return null;

        let extraProps = {};

        if (field.type === 'checkbox') {
          extraProps = {
            label: field.props.label,
            name: field.props.name,
            options: field.props.options || [],
            checked: field.props.checked || [],
            style: field.style,
            onChange: (newValues) => {
              updateField(field.id, {
                props: { ...field.props, checked: newValues },
              });
            },
          };
        }

        if (field.type === 'radio') {
          extraProps = {
            label: field.props.label,
            name: field.props.name,
            options: (field.props.options || []).map(opt =>
              typeof opt === 'object'
                ? opt
                : { label: opt, value: opt }
            ),
            value: field.props.value,
            style: field.style,
            onChange: (newValue) => {
              updateField(field.id, {
                props: {
                  ...field.props,
                  value: newValue,
                },
              });
            },
          };
        }

        if (field.type === 'select') {
          extraProps = {
            label: field.props.label,
            name: field.props.name,
            options: (field.props.options || []).map(opt =>
              typeof opt === 'object'
                ? opt
                : { label: opt, value: opt }
            ),
            style: field.style,
          };
        }

        if (field.type === 'date') {
          extraProps = {
            label: field.props.label,
            name: field.props.name,
            value: field.props.value,
            placeholder: field.props.placeholder,
            style: field.style,
            onChange: (newDate) => {
              updateField(field.id, {
                props: {
                  ...field.props,
                  value: newDate,
                },
              });
            },
          };
        }

        if (field.type === 'paragraph') {
          extraProps = {
            text: field.props.text,
            content: field.props.content,
            style: field.style,
          };
        }


        if (field.type === 'header') {
          extraProps = {
            text: field.props.text,
            level: field.props.level,
            style: field.style,
          };
        }

        if (field.type === 'button') {
          extraProps = {
            label: field.props.label,
            type: field.props.type,
            style: field.style,
          };
        }

        if (field.type === 'number') {
          extraProps = {
            label: field.props.label,
            name: field.props.name,
            min: field.props.min,
            max: field.props.max,
            step: field.props.step,
            placeholder: field.props.placeholder,
            numberType: field.props.numberType,
            style: field.style,
            value: field.props.value,
            onChange: (newValue) => {
              updateField(field.id, {
                props: {
                  ...field.props,
                  value: newValue,
                },
              });
            },
          };
        }

        if (field.type === 'file') {
          extraProps = {
            label: field.props.label,
            name: field.props.name,
            multiple: field.props.multiple || false,
            style: field.style,
            value: field.props.value,
            onChange: (files) => {
              updateField(field.id, {
                props: {
                  ...field.props,
                  value: files,
                },
              });
            },
          };
        }

        return (
          <div
            key={field.id}
            onClick={() => {
              if (['paragraph', 'header', 'text', 'textarea'].includes(field.type)) {
                onSelectField(field.id);
              }
            }}
          >
            <FieldWrapper>
              <div className="relative group">

                <div className="absolute -top-2 -right-3 flex gap-1">
                  <button
                    onClick={() => onEdit(field.id)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Pencil size={16} color='blue' />
                  </button>
                  <button
                    onClick={() => onDelete(field.id)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Trash2 size={16} color='red' />
                  </button>
                  <button
                    onClick={() => onMoveUp(field.id)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    onClick={() => onMoveDown(field.id)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <ArrowDown size={16} />
                  </button>
                </div>

                <Component
                  {...field.props}
                  {...extraProps}
                />
              </div>
            </FieldWrapper>
          </div>
        );
      })}

      <JsonPreviewModal
        isOpen={jsonPreviewOpen}
        onClose={() => setJsonPreviewOpen(false)}
        onConfirm={confirmSaveJSON}
        jsonData={jsonString}
      />

      <HtmlPreviewModal
        isOpen={htmlPreviewOpen}
        onClose={() => setHtmlPreviewOpen(false)}
        onConfirm={confirmSaveHTML}
        htmlData={htmlString}
      />
      <Toaster />
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <Loader />
        </div>
      )}

    </div>
  );
}
