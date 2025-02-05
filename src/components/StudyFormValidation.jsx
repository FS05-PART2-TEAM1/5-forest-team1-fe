import { useState } from "react";

const StudyFormValidation = ({ id, label, placeholder, validateFn }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleBlur = () => {
    const validationError = validateFn(value);
    setError(validationError);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (error) setError("");
  };
  return (
    <div className="flex flex-col mb-4 gap-2">
      <label className="text-lg font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`border p-3 h-12 rounded-lg ${
          error ? "border-f-error" : "border-gray-300"
        }`}
      />
      {error && <span className="text-f-error text-sm">{error}</span>}
    </div>
  );
};

export default StudyFormValidation;
