import { useState, useEffect } from "react";

const StudyFormValidation = ({
  id,
  label,
  placeholder,
  validateFn = () => null, // 기본값을 함수로 설정
  type = "text",
  onChange,
  onValidate,
  isTextarea = false,
  value: initialValue = "", // value를 props로 받고 기본값은 ""
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setValue(initialValue); // 외부에서 받은 값이 변경될 경우 상태 업데이트
  }, [initialValue]);

  const handleBlur = () => {
    const validationError = validateFn(value);
    setError(validationError);
    onValidate?.(validationError);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (error) {
      setError("");
      onValidate?.(null);
    }
    onChange?.(e);
  };

  return (
    <div className="flex flex-col space-y-1 w-full ">
      <label className="text-lg font-semibold" htmlFor={id}>
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          value={value}
          placeholder={!value ? placeholder : ""}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`border rounded-xl p-3 leading-7 resize-none w-full ${
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
          placeholder={!value ? placeholder : ""}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`border h-12 rounded-xl p-3 w-full ${
            error ? "border-f-error" : "border-gray-200"
          }`}
        />
      )}
      {error && <span className="text-f-error text-sm">{error}</span>}
    </div>
  );
};

export default StudyFormValidation;
