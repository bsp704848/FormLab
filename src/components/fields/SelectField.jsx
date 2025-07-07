export default function SelectField({ label, name, options = [],style }) {
    return (
      <div className="mb-4 w-full max-w-md mx-auto">
        <label className="block font-semibold text-sm sm:text-base mb-1">{label}</label>
        <select name={name} style={style} className="w-full border p-2 rounded-lg text-sm sm:text-base">
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  