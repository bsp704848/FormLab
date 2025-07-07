
import Modal from "../../components/ui/Modal";
import { ChromePicker } from 'react-color';


export default function FieldEditorModal({
  field,
  isOpen,
  onClose,
  updateField,
}) {
  if (!field) return null;

  const handleChange = (prop, value) => {
    updateField(field.id, {
      props: {
        ...field.props,
        [prop]: value,
      },
    });
  };

  const handleStyleChange = (styleProp, value) => {
    updateField(field.id, {
      style: {
        ...field.style,
        [styleProp]: value,
      },
    });
  };

  const renderCommonTextFields = () => (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-900">Label</label>
        <input
          type="text"
          value={field.props.label || ""}
          onChange={(e) => handleChange("label", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-900">Placeholder</label>
        <input
          type="text"
          value={field.props.placeholder || ""}
          onChange={(e) => handleChange("placeholder", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-900">Value</label>
        <input
          type={field.props?.type || "text"}
          value={field.props.value || ""}
          onChange={(e) => handleChange("value", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
    </>
  );

  const renderStyleEditor = () => (
    <div className="mt-6">
      <h3 className="text-gray-800 text-base font-semibold mb-4">
        Style Settings
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-sm font-medium text-gray-900">
            Font Size
          </label>
          <input
            type="text"
            value={field.style?.fontSize || ""}
            onChange={(e) => handleStyleChange("fontSize", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="sm:col-span-2 flex flex-col sm:flex-row gap-4">

          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-900">
              Color
            </label>
            <div className="w-full">
              <ChromePicker
                color={field.style?.color || "#000000"}
                onChangeComplete={(color) =>
                  handleStyleChange("color", color.hex)
                }
                styles={{
                  default: {
                    picker: {
                      width: "100%",
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-900">
              Background Color
            </label>
            <div className="w-full">
              <ChromePicker
                color={field.style?.backgroundColor || "#ffffff"}
                onChangeComplete={(color) =>
                  handleStyleChange("backgroundColor", color.hex)
                }
                styles={{
                  default: {
                    picker: {
                      width: "100%",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>


      </div>
    </div>
  );

  const renderFieldSpecificInputs = () => {
    switch (field.type) {
      case "text":
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderCommonTextFields()}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-900">
                  Type
                </label>
                <select
                  value={field.props.type || ""}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="">Select Type</option>
                  <option value="password">Password</option>
                  <option value="telephone">Telephone</option>
                  <option value="email">Email</option>
                  <option value="color">Color</option>
                  <option value="text">Text</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-900">
                  Name
                </label>
                <input
                  type="text"
                  value={field.props.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
            </div>


            {renderStyleEditor()}
          </>
        );

      case "textarea":
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderCommonTextFields()}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-900">
                  Max Length
                </label>
                <input
                  type="number"
                  value={field.props.maxLength || ""}
                  onChange={(e) =>
                    handleChange("maxLength", Number(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-900">
                  Rows
                </label>
                <input
                  type="number"
                  value={field.props.rows || ""}
                  onChange={(e) =>
                    handleChange("rows", Number(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
            </div>
            {renderStyleEditor()}
          </>
        );

      case "autocomplete":
      case "checkbox":
      case "radio":
      case "select":
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderCommonTextFields()}

              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-sm font-medium text-gray-900">
                  Options (comma-separated)
                </label>
                <input
                  type="text"
                  value={
                    field.props.options?.map(opt =>
                      typeof opt === "object" ? opt.label : opt
                    ).join(", ") || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "options",
                      e.target.value.split(",").map(opt => ({
                        label: opt.trim(),
                        value: opt.trim(),
                      }))
                    )
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={field.props.required || false}
                  onChange={(e) =>
                    handleChange("required", e.target.checked)
                  }
                  className="h-4 w-4 border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-900">
                  Required
                </label>
              </div>

              {(field.type === "radio" || field.type === "checkbox") && (
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-sm font-medium text-gray-900">
                    Checked Options (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={(field.props.checked || []).join(", ")}
                    onChange={(e) =>
                      handleChange(
                        "checked",
                        e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean)
                      )
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
              )}
            </div>
            {renderStyleEditor()}
          </>
        );

      case "button":
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-900">
                  Label
                </label>
                <input
                  type="text"
                  value={field.props.label || ""}
                  onChange={(e) => handleChange("label", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-900">
                  Type
                </label>
                <select
                  value={field.props.type || ""}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="button">Button</option>
                  <option value="submit">Submit</option>
                  <option value="reset">Reset</option>
                </select>
              </div>
            </div>
            {renderStyleEditor()}
          </>
        );

      case "date":
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderCommonTextFields()}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-900">
                  Date Type
                </label>
                <select
                  value={field.props.dateType || ""}
                  onChange={(e) => handleChange("dateType", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="">Select Type</option>
                  <option value="date">Date</option>
                  <option value="time">Time</option>
                  <option value="datetime-local">Datetime Local</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-900">
                  Name
                </label>
                <input
                  type="text"
                  value={field.props.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
            </div>
            {renderStyleEditor()}
          </>
        );

      case "file":
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderCommonTextFields()}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={field.props.multiple || false}
                  onChange={(e) =>
                    handleChange("multiple", e.target.checked)
                  }
                  className="h-4 w-4 border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-900">
                  Allow multiple files
                </label>
              </div>
            </div>
            {renderStyleEditor()}
          </>
        );

      case "header":
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-900">
                  Text
                </label>
                <input
                  type="text"
                  value={field.props.text || ""}
                  onChange={(e) => handleChange("text", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-900">
                  Level
                </label>
                <select
                  value={field.props.level || 1}
                  onChange={(e) =>
                    handleChange("level", parseInt(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  {[1, 2, 3, 4, 5, 6].map((l) => (
                    <option key={l} value={l}>
                      H{l}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {renderStyleEditor()}
          </>
        );

      case "number":
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderCommonTextFields()}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-900">
                  Number Type
                </label>
                <select
                  value={field.props.numberType || ""}
                  onChange={(e) => handleChange("numberType", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="">Select Type</option>
                  <option value="number">Number</option>
                  <option value="range">Range</option>
                </select>
              </div>
            </div>
            {renderStyleEditor()}
          </>
        );

      case "paragraph":
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-900">
                  Content
                </label>
                <input
                  type="text"
                  value={field.props.text || ""}
                  onChange={(e) => handleChange("text", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-900">
                  Type
                </label>
                <select
                  value={field.props.type || ""}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="">Select Type</option>
                  <option value="address">Address</option>
                  <option value="canvas">Canvas</option>
                  <option value="blockquote">Blockquote</option>
                  <option value="output">Output</option>
                </select>
              </div>
            </div>
            {renderStyleEditor()}
          </>
        );

      default:
        return (
          <p className="text-gray-500 text-sm">
            No editor available for field type: <b>{field.type}</b>
          </p>
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit ${field.type}`}
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-gray-800 text-base font-semibold mb-4">
            Field Properties
          </h2>
          {renderFieldSpecificInputs()}
        </div>
      </div>
    </Modal>
  );
}

