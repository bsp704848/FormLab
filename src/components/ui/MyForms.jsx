/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { fetchFormsForUser, deleteForm } from "../../utils/formsApi";
import { useFormStore } from "../../store/useFormStore";
import { Check, X, Pencil, Trash2, CodeXml, Braces } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const MyForms = () => {
  const [forms, setForms] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedFormId, setSelectedFormId] = useState(null);

  const setFields = useFormStore((state) => state.setFields);
  const setEditingFormId = useFormStore((state) => state.setEditingFormId);

  const navigate = useNavigate()
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!hasLoaded.current) {
      loadForms();
      hasLoaded.current = true;
    }
  }, []);

  const loadForms = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("Cannot load forms: userId not found!");
      return;
    }
    try {
      const data = await fetchFormsForUser(userId);
      setForms(data);
    } catch (error) {
      console.error("Error fetching user forms:", error);
    }
  };


  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const handleLoadForm = (form) => {
    let parsedJson;
    try {
      parsedJson = JSON.parse(form.json);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      parsedJson = {};
    }
    localStorage.setItem("preview-json", JSON.stringify(parsedJson));
    window.open("/preview.json.html", "_blank");
    setFields(parsedJson || []);
  };


  const handleEdit = (form) => {
    let parsedJson = typeof form.json === "string" ? JSON.parse(form.json) : form.json;
    setFields(parsedJson || []);
    setEditingFormId(form._id);
    navigate("/formbuilder");
  };


  const handleDelete = async () => {
    try {
      await deleteForm(selectedFormId);
      setForms((prev) => prev.filter((f) => f._id !== selectedFormId));
    } catch (error) {
      console.error("Failed to delete form:", error);
    } finally {
      setShowConfirm(false);
      setSelectedFormId(null);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const datePart = d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
    const timePart = d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    return `${datePart} ${timePart}`;
  };

  const renderIcon = (condition) => {
    return condition ? (
      <Check className="text-green-600 w-5 h-5" />
    ) : (
      <X className="text-red-600 w-5 h-5 font-bold" />
    );
  };

  return (
    <div className="p-4 pt-10 pb-20 max-w-7xl mx-auto ">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        My Saved Forms
      </h2>

      {forms.length === 0 && (
        <p className="text-center text-gray-500">No forms found yet.
          <br />
          <button
            className="mt-3 mb-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/formbuilder")}
          >
            Create New Form
          </button>
        </p>
      )}
      <div className="hidden md:block rounded-xl overflow-hidden border border-gray-200 shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="py-3 px-4 text-center">Number</th>
              <th className="py-3 px-4 text-center">Form Name</th>
              <th className="py-3 px-4 text-center">Last Edited</th>
              <th className="py-3 px-4 text-center">JSON</th>
              <th className="py-3 px-4 text-center">HTML</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {forms.map((form, index) => (
              <tr key={form._id} className="hover:bg-gray-50 transition cursor-pointer">
                <td className="py-3 px-4 text-center">{index + 1}</td>
                <td className="py-3 px-4 text-center">{form.name}</td>
                <td className="py-3 px-4 text-center">
                  {formatDate(form.updatedAt || form.createdAt)}

                </td>

                <td className="py-3 px-4 text-center align-middle ">
                  <div className="inline-flex justify-center items-center">
                    {renderIcon(form.json)}
                  </div></td>

                <td className="py-3 px-4 text-center align-middle">
                  <div className="inline-flex justify-center items-center">
                    {renderIcon(form.html)}</div>
                </td>

                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {form.json && (
                      <button
                        data-tooltip-id={`tooltip-${form._id}-edit`}
                        data-tooltip-content="Edit Form"
                        className="w-8 h-8 p-2 rounded-md hover:bg-blue-50 text-blue-600 hover:text-blue-800 transition"
                        onClick={() => handleEdit(form)}
                      >
                        <Pencil className="w-5 h-5 strokeWidth={2.5}" />
                      </button>
                    )}
                    {form.json && (
                      <button
                        data-tooltip-id={`tooltip-${form._id}-edit`}
                        data-tooltip-content="Load Form JSON"
                        className="w-8 h-8 p-2 rounded-md hover:bg-green-50 text-green-600 hover:text-green-800 transition"
                        onClick={() => handleLoadForm(form)}
                      >
                        <Braces className="w-5 h-5 strokeWidth={2.5}" />
                      </button>
                    )}
                    {form.html && (
                      <button
                        data-tooltip-id={`tooltip-${form._id}-edit`}
                        data-tooltip-content="View HTML"
                        className="w-8 h-8 p-2 rounded-md hover:bg-slate-100 text-slate-600 hover:text-slate-800 transition"
                        onClick={() => {
                          localStorage.setItem("preview-html", form.html || "<p>No HTML found.</p>");
                          window.open("/preview.html.html", "_blank");
                        }}
                      >
                        <CodeXml className="w-5 h-5 strokeWidth={2.5}" />
                      </button>
                    )}
                    <button
                      data-tooltip-id={`tooltip-${form._id}-edit`}
                      data-tooltip-content="Delete Form"
                      className="w-8 h-8 p-2 rounded-md hover:bg-red-50 text-red-600 hover:text-red-800 transition"
                      onClick={() => {
                        setSelectedFormId(form._id);
                        setShowConfirm(true);
                      }}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <Tooltip id={`tooltip-${form._id}-edit`} place="top" />
                    <Tooltip id={`tooltip-${form._id}-load`} place="top" />
                    <Tooltip id={`tooltip-${form._id}-html`} place="top" />
                    <Tooltip id={`tooltip-${form._id}-delete`} place="top" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="md:hidden space-y-4 mt-6">
        {forms.map((form, index) => (
          <div
            key={form._id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <div className="text-sm text-gray-500 mb-2">
              Last Edited:{" "}
              <span className="text-gray-800 font-medium">
                {formatDate(form.updatedAt || form.createdAt)}
              </span>

            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-700 font-medium">Has JSON?</span>
              <span>{renderIcon(form.json)}</span>
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-700 font-medium">Has HTML?</span>
              <span>{renderIcon(form.html)}</span>
            </div>
            <div className="grid grid-cols-4 gap-1 mt-3">
              {form.json && (
                <>
                  <button
                    data-tooltip-id={`tooltip-${form._id}-edit`}
                    data-tooltip-content="Edit Form"
                    className="w-10 h-10  flex items-center justify-center text-white rounded"
                    onClick={() => handleEdit(form)}
                  >
                    <Pencil className="w-5 h-5 text-blue-600 hover:text-blue-700" />
                  </button>
                  <button
                    data-tooltip-id={`tooltip-${form._id}-edit`}
                    data-tooltip-content="Load Form JSON"
                    className="w-10 h-10  flex items-center justify-center text-white rounded"
                    onClick={() => handleLoadForm(form)}
                  >
                    <Braces className="w-5 h-5 text-slate-600 hover:text-slate-700" />
                  </button>
                </>
              )}
              {form.html && (
                <button
                  data-tooltip-id={`tooltip-${form._id}-edit`}
                  data-tooltip-content="View HTML"
                  className="w-10 h-10  flex items-center justify-center text-white rounded"
                  onClick={() => {
                    localStorage.setItem("preview-html", form.html || "<p>No HTML found.</p>");
                    window.open("/preview.html.html", "_blank");
                  }}
                >
                  <CodeXml className="w-5 h-5 text-green-600 hover:text-green-700" />
                </button>
              )}

              <button
                data-tooltip-id={`tooltip-${form._id}-edit`}
                data-tooltip-content="Delete Form"
                className="w-10 h-10  flex items-center justify-center text-white rounded"
                onClick={() => {
                  setSelectedFormId(form._id);
                  setShowConfirm(true);
                }}
              >
                <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600 hover:bg-red-400" />
              </button>
              <Tooltip id={`tooltip-${form._id}-edit`} place="top" />
              <Tooltip id={`tooltip-${form._id}-load`} place="top" />
              <Tooltip id={`tooltip-${form._id}-html`} place="top" />
              <Tooltip id={`tooltip-${form._id}-delete`} place="top" />

            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this form? This action cannot be undone."
      />
    </div>
  );
};

export default MyForms;
