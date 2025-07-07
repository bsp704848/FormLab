export default function AutoCompleteField({ label, name, options = [], style }) {
  return (
    <div className="mb-4 w-full max-w-md mx-auto">
      <label className="block font-semibold text-sm sm:text-base mb-1">
        {label}
      </label>
      <input
        list={`${name}-list`}
        name={name}
        style={style}
        className="w-full border p-2 rounded-lg text-sm sm:text-base"
      />
      <datalist id={`${name}-list`}>
        {options.map((opt, i) => {
          const val =
            typeof opt === "object" ? opt.label || opt.value : opt;
          return <option key={i} value={val} />;
        })}
      </datalist>
    </div>
  );
}
