export default function CheckBoxField({
  label,
  name,
  options = [],
  checked,
  style,
  onChange,
}) {
  const checkedValues = Array.isArray(checked) ? checked : [];

  const handleCheckboxChange = (value, e) => {
    e.stopPropagation();
    let newChecked;
    if (checkedValues.includes(value)) {
      newChecked = checkedValues.filter((v) => v !== value);
    } else {
      newChecked = [...checkedValues, value];
    }
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <div className="mb-4 w-full max-w-md mx-auto">
      <label className="block font-semibold text-sm sm:text-base mb-1">
        {typeof label === "object" && label !== null
          ? label.label || ""
          : label}
      </label>
      <div className="flex flex-col gap-2">
        {options.map((opt, idx) => {
          const optionLabel =
            typeof opt === "object" && opt !== null
              ? opt.label
              : opt;

          const optionValue =
            typeof opt === "object" && opt !== null
              ? opt.value
              : opt;

          return (
            <label
              key={idx}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                name={name}
                value={optionValue}
                checked={checkedValues.includes(optionValue)}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  handleCheckboxChange(optionValue, e)
                }
                style={style}
                className="w-4 h-4"
              />
              <span className="text-sm sm:text-base">
                {optionLabel}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
