export default function RadioField({ label, name, options = [], value, onChange, style }) {
  return (
    <div className="mb-4 w-full max-w-md mx-auto" style={style}>
      <p className="font-semibold text-sm sm:text-base mb-1">{label}</p>
      {options.map((opt, i) => (
        <label key={i} className="block text-sm sm:text-base">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange?.(opt.value)}
            className="mr-2"
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}
