import { useState } from "react";

const StudyFormValidation = ({
  id,
  label,
  placeholder,
  validateFn,
  type = "text",
  onChange,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleBlur = () => {
    const validationError = validateFn(value);
    setError(validationError);
  };
  const handleChange = (e) => {

    const newValue = e.target.value;
    setValue(newValue);
    if (error) setError("");
    onChange?.(newValue); // onChange가 존재할 때만 호출

  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-semibold" htmlFor={id}>
        {label}
      </label>
<<<<<<< HEAD
      {isTextarea ? (
        <textarea
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`border rounded-xl p-3 leading-7 resize-none ${
            error ? "border-f-error" : "border-gray-200"
          } h-[100px]`}
          style={{
            resize: "none", // 사용자가 크기를 조정하지 못하게
            overflowY: "auto", // 세로 스크롤만 허용
          }}
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
=======
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
>>>>>>> 221d6ffbe6975f9bcd83bcb675bf982ed68acc0d
      {error && <span className="text-f-error text-sm">{error}</span>}
    </div>
  );
};

export default StudyFormValidation;
