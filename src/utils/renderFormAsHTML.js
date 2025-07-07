export default function renderFormAsHTML(fields) {
  const styleToString = (styleObj) => {
    if (!styleObj) return '';
    return Object.entries(styleObj)
      .map(([key, val]) => {
        const kebabKey = key.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
        return `${kebabKey}: ${val};`;
      })
      .join(' ');
  };

  const formContent = fields.map((field) => {
    const styleString = styleToString(field.style); 

    
    switch (field.type) {
      case 'text': {
        const inputType = field.props.type || 'text';
      
        if (inputType === 'password') {
          return `
            <div class="mb-6 relative" style="${styleString}">
              <label class="block font-semibold text-gray-700 mb-2">${field.props.label || ''}</label>
              <input 
                id="${field.id}"
                type="password"
                placeholder="${field.props.placeholder || ''}" 
                value="${field.props.value || ''}"
                class="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                style="${styleString}"
              />
              <button 
                type="button"
                onclick="
                  const input = document.getElementById('${field.id}');
                  input.type = input.type === 'password' ? 'text' : 'password';
                  this.textContent = input.type === 'password' ? 'Show' : 'Hide';
                "
                class="absolute top-8 right-2 text-blue-500 text-sm"
              >Show</button>
            </div>
          `;
        } else {
          return `
            <div class="mb-6" style="${styleString}">
              <label class="block font-semibold text-gray-700 mb-2">${field.props.label || ''}</label>
              <input 
                type="${inputType}"
                placeholder="${field.props.placeholder || ''}" 
                value="${field.props.value || ''}"
                class="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                style="${styleString}"
              />
            </div>
          `;
        }
      }
      

      case 'textarea':
        return `
          <div class="mb-6" style="${styleString}">
            <label class="block font-semibold text-gray-700 mb-2">${field.props.label || ''}</label>
            <textarea 
              placeholder="${field.props.placeholder || ''}" 
              rows="${field.props.rows || 3}" 
              class="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              style="${styleString}"
            >${field.props.value || ''}</textarea>
          </div>
        `;

      case 'checkbox':
        return `
          <div class="mb-6" style="${styleString}">
            <span class="block font-semibold text-gray-700 mb-2">${field.props.label || ''}</span>
            ${(field.props.options || []).map(opt => {
              const optionVal = typeof opt === 'object' ? opt.value : opt;
              const optionLabel = typeof opt === 'object' ? opt.label : opt;
              return `
                <label class="inline-flex items-center space-x-2 mr-4">
                  <input 
                    type="checkbox" 
                    name="${field.props.name || ''}"
                    value="${optionVal}"
                    ${(field.props.checked || []).includes(optionVal) ? 'checked' : ''}
                    class="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span>${optionLabel}</span>
                </label>
              `;
            }).join('')}
          </div>
        `;

      case 'radio':
        return `
          <fieldset class="mb-6" style="${styleString}">
            <legend class="block font-semibold text-gray-700 mb-2">${field.props.label || ''}</legend>
            ${(field.props.options || []).map(opt => `
              <label class="inline-flex items-center space-x-2 mr-4">
                <input 
                  type="radio" 
                  name="${field.props.name}" 
                  value="${typeof opt === 'object' ? opt.value : opt}" 
                  ${field.props.value === (typeof opt === 'object' ? opt.value : opt) ? 'checked' : ''}
                  class="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span>${typeof opt === 'object' ? opt.label : opt}</span>
              </label>
            `).join('')}
          </fieldset>
        `;

      case 'select':
        return `
          <div class="mb-6" style="${styleString}">
            <label class="block font-semibold text-gray-700 mb-2">${field.props.label || ''}</label>
            <select 
              class="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              style="${styleString}"
              ${field.props.multiple ? 'multiple' : ''}
            >
              ${(field.props.options || []).map(opt => {
                const val = typeof opt === 'object' ? opt.value : opt;
                const label = typeof opt === 'object' ? opt.label : opt;
                return `
                  <option value="${val}">${label}</option>
                `;
              }).join('')}
            </select>
          </div>
        `;

      case 'paragraph':
        return `
          <p class="mb-6 text-gray-700 leading-relaxed" style="${styleString}">
            ${field.props.text || field.props.content || ''}
          </p>
        `;

      case 'header': {
        const level = field.props.level || 2;
        return `
          <h${level} class="mb-6 font-bold text-gray-900 text-2xl" style="${styleString}">
            ${field.props.text || ''}
          </h${level}>
        `;
      }

      case 'button':
        return `
          <div class="mb-6">
            <button 
              type="${field.props.type || 'button'}" 
              class="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-all"
              style="${styleString}"
            >
              ${field.props.label || ''}
            </button>
          </div>
        `;

      case 'file':
        return `
          <div class="mb-6" style="${styleString}">
            <label class="block font-semibold text-gray-700 mb-2">${field.props.label || 'Upload File'}</label>
            <input 
              type="file" 
              name="${field.props.name || ''}"
              ${field.props.multiple ? 'multiple' : ''}
              class="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              style="${styleString}"
            />
          </div>
        `;

      case 'date':
        return `
          <div class="mb-6" style="${styleString}">
            <label class="block font-semibold text-gray-700 mb-2">${field.props.label || ''}</label>
            <input 
              type="text"
              value="${field.props.value
                ? new Date(field.props.value).toLocaleDateString('en-GB')
                : ''}"
              class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none bg-gray-100 text-gray-700"
              style="${styleString}"
              readonly
            />
          </div>
        `;

      case 'number': {
        const inputType = field.props.numberType === 'range' ? 'range' : 'number';
        const displayValue = field.props.numberType === 'range'
          ? `<p class="text-xs text-gray-500 mt-2">Value: ${field.props.value ?? ''}</p>`
          : '';

        return `
          <div class="mb-6" style="${styleString}">
            <label class="block font-semibold text-gray-700 mb-2">${field.props.label || ''}</label>
            <input 
              type="${inputType}"
              name="${field.props.name || ''}"
              min="${field.props.min || ''}"
              max="${field.props.max || ''}"
              step="${field.props.step || ''}"
              value="${field.props.value ?? ''}"
              class="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              style="${styleString}"
            />
            ${displayValue}
          </div>
        `;
      }

      case 'autocomplete':
        return `
          <div class="mb-6" style="${styleString}">
            <label class="block font-semibold text-gray-700 mb-2">${field.props.label || ''}</label>
            <input 
              list="${field.id}-list"
              name="${field.props.name || ''}"
              class="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              style="${styleString}"
            />
            <datalist id="${field.id}-list">
              ${(field.props.options || []).map(opt => {
                const val = typeof opt === 'object' ? (opt.label || opt.value) : opt;
                return `<option value="${val}"></option>`;
              }).join('')}
            </datalist>
          </div>
        `;

      default:
        return '';
    }
  }).join('\n');

  return `
    <div class="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
      ${formContent}
    </div>
  `;
}

