import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { saveForm, fetchFormsForUser, updateForm } from '../utils/formsApi'; 



export const useFormStore = create(
  persist(
    (set, get) => ({
      fields: [],
      editingFormId: null,
      formName: "",

      setEditingFormId: (id) => set({ editingFormId: id }), 

      setFormName: (name) => set({ formName: name }),

      addField: (field) =>
        set((state) => ({ fields: [...state.fields, field] })),

      updateField: (fieldId, updates) =>
        set((state) => ({
          fields: state.fields.map((field) => {
            if (field.id !== fieldId) return field;

            return {
              ...field,
              props: updates.props
                ? { ...field.props, ...updates.props }
                : field.props,
              style: updates.style
                ? { ...field.style, ...updates.style }
                : field.style,
            };
          }),
        })),


      removeField: (fieldId) =>
        set((state) => ({
          fields: state.fields.filter((f) => f.id !== fieldId),
        })),

      setFields: (fields) => set({ fields }), 
      clearForm: () => set({ fields: [], editingFormId: null }),

      saveToBackend: async () => {
        const fields = get().fields;
        const editingFormId = get().editingFormId;
        const formName = get().formName;

        const userId = localStorage.getItem("userId"); 

        if (!userId) {
          console.error("Cannot save form: userId not found!");
          return;
        }
        const payload = {
          json: JSON.stringify(fields),
          html: null,
          userId: userId,
          name: formName || "Untitled Form",
        };
        try {
          if (editingFormId) {
            await updateForm(editingFormId, payload);
          } else {
            await saveForm(payload);
          }
          set({ editingFormId: null });
          return true;
        } catch (error) {
          console.error("Error saving form:", error);
        }
      },

      loadFromBackend: async () => {
        const userId = localStorage.getItem("userId");
      
        if (!userId) {
          console.error("Cannot load forms: userId not found!");
          return;
        }
        try {
          const data = await fetchFormsForUser(userId);
      
          if (data.length === 0) {
            return;
          }

          const form = data[0];
      
          const parsedJson = typeof form.json === "string"
            ? JSON.parse(form.json)
            : form.json;

          set({ fields: parsedJson || [], formName: form.name || "", });
        } catch (error) {
          console.error("Error loading forms:", error);
        }
      },
    
    }),
    {
      name: 'form-storage',
      partialize: (state) => ({ fields: state.fields,formName: state.formName, }),
    }
  )
);
