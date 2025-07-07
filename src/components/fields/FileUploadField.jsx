export default function FileUploadField({
  label = "Upload File",
  name,
  multiple = false,
  style,
  value,
  onChange,
}) {
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (onChange) {
      onChange(multiple ? Array.from(files) : files[0] || null);
    }
  };

  return (
    <div className="mb-4 w-full max-w-md mx-auto">
      <label className="block font-semibold text-sm sm:text-base mb-1">
        {label}
      </label>
      <input
        type="file"
        name={name}
        multiple={multiple}
        onChange={handleFileChange}
        style={style}
        className="border p-2 rounded w-full text-sm sm:text-base"
      />
      {value && (
        <div className="mt-2 text-xs text-gray-900">
          {Array.isArray(value)
            ? value.map((file, idx) => (
                <div key={idx}>{file.name}</div>
              ))
            : value?.name}
        </div>
      )}
    </div>
  );
}
