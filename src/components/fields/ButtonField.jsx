export default function ButtonField({ label, type = "button",style}) {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <button
        type={type}
        style={style}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto text-sm sm:text-base"
      >
        {label}
      </button>
    </div>
  );
}
