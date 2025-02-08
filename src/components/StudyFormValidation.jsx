import { useState } from "react";

const StudyFormValidation = ({
  id,
  label,
  placeholder,
  validateFn,
  type = "text",
  onChange,
  isTextarea = false,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleBlur = () => {
    const validationError = validateFn(value);
    setError(validationError);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (error) setError("");
    if (onChange) onChange(e);
  };

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-lg font-semibold" htmlFor={id}>
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            width: "100%",
            height: "100px",
            resize: "none", // 사용자가 크기를 조정하지 못하게
            overflowY: "auto", // 세로 스크롤만 허용
          }}
          className={`border h-24 rounded-xl p-3 leading-7 resize-none ${
            error ? "border-f-error" : "border-gray-200"
          }`}
        />
      ) : (
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
      )}
      {error && <span className="text-f-error text-sm">{error}</span>}
    </div>
  );
};

export default StudyFormValidation;
