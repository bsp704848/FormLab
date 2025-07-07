export default function TextAreaField({
  label,
  placeholder,
  name,
  required,
  rows,
  style,
  value,
  onChange,
}) {
  return (
    <div className="mb-4 w-full max-w-md mx-auto">
      <label className="block font-semibold text-sm sm:text-base mb-1">{label}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        style={style}
        className="w-full border p-2 rounded-lg text-sm sm:text-base"
      />
    </div>
  );
}
