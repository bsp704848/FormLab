import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';

export default function DateField({
  label,
  name,
  value,
  onChange,
  style,
  placeholder = "Select a date"
}) {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (value) {
      const parsed = new Date(value);
      if (!isNaN(parsed.getTime())) {
        setSelectedDate(parsed);
      }
    }
  }, [value]);

  const handleChange = (date) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(date ? date.toISOString() : '');
    }
  };

  return (
    <div className="mb-4 w-full max-w-md mx-auto">
      <label className="block font-semibold text-sm sm:text-base mb-1">
        {label}
      </label>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder}
        name={name}
        className="w-full border p-2 rounded-lg"
        style={style}
      />
    </div>
  );
}
