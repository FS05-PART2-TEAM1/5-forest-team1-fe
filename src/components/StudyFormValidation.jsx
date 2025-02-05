import { useState } from "react";

const StudyFormValidation = ({
  id,
  type = "password",
  label,
  placeholder,
  validateFn,
  value,
  setValue,
  confirmPassword,
}) => {
  const [error, setError] = useState("");

  const handleBlur = () => {
    const validationError = validateFn(value, confirmPassword);
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
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`border h-12 rounded-xl p-3 ${
          error ? "border-f-error" : "border-gray-200"
        }`}
      />
      {error && <span className="text-f-error text-sm">{error}</span>}
    </div>
  );
};

export default StudyFormValidation;
