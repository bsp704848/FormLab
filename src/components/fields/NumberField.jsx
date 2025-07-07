export default function NumberField({
  label = "Enter a number",
  name,
  min,
  max,
  step = 1,
  placeholder = "0",
  numberType = "number",
  style,
  value,
  onChange,
}) {
  const handleChange = (e) => {
    let newValue = e.target.value;
    if (numberType === "range") {
      newValue = Number(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div className="mb-4 w-full max-w-md mx-auto">
      <label className="block font-semibold text-sm sm:text-base mb-1">
        {label}
      </label>
      <input
        type={numberType === "range" ? "range" : "number"}
        name={name}
        min={min}
        max={max}
        step={step}
        value={value ?? ""}
        placeholder={placeholder}
        style={style}
        onChange={handleChange}
        className="border p-2 rounded-lg w-full text-sm sm:text-base"
      />
      {numberType === "range" && (
        <p className="text-xs text-gray-600 mt-1">
          Value: {value}
        </p>
      )}
    </div>
  );
}
