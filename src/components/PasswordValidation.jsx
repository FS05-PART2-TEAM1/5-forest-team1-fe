import { useState } from "react";
import hideIcon from "../assets/icons/btn_visibility_on.svg";
import openIcon from "../assets/icons/btn_visibility_off.svg";

const PasswordValidation = ({
  id,
  label,
  placeholder,
  validateFn,
  onChange,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

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
    <div className="flex flex-col space-y-1 relative">
      <label className="text-lg font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={isVisible ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`border h-12 rounded-xl p-3 ${
          error ? "border-f-error" : "border-gray-200"
        }`}
      />
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="absolute right-3 top-[42px] w-6 h-6"
      >
        <img
          src={isVisible ? hideIcon : openIcon}
          alt={isVisible ? "비밀번호 숨기기" : "비밀번호 보이기"}
        />
      </button>
      {error && <span className="text-f-error text-sm">{error}</span>}
    </div>
  );
};

export default PasswordValidation;
