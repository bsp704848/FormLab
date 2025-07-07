import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function TextField({
  label,
  placeholder,
  name,
  required,
  style,
  value,
  onChange,
  type,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type || "text";

  const safeLabel =
    typeof label === "object" && label !== null
      ? label?.label || ""
      : label || "";

  const safeValue =
    typeof value === "object" && value !== null
      ? value?.value || ""
      : value || "";

  return (
    <div className="mb-4 w-full max-w-md mx-auto relative">
      <label className="block mb-1 text-gray-700">{safeLabel}</label>
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        required={required}
        value={safeValue}
        onChange={(e) => onChange?.(e.target.value)}
        style={style}
        className="w-full border p-2 rounded-lg pr-10"
      />

      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[48px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
}
