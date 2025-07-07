export default function FieldWrapper({ children }) {
  return (
    <div className="p-3 rounded relative max-w-screen-sm w-full mx-auto hover:bg-white">
      {children}
    </div>
  );
}
