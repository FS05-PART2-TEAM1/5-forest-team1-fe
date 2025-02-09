import { useState } from "react";
import icToggle from "@assets/icons/ic_toggle.png";
import clsx from "clsx";

const Select = ({ selected, onClick, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState(
    options.find((o) => o.value === selected).label
  );

  const handleClickInputButton = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOption = (option) => {
    if (label !== option.label) {
      setLabel(option.label);
      onClick(option.value);
    }
  };

  return (
    <div className="relative z-[9999]">
      <input
        value={label}
        type="button"
        onClick={handleClickInputButton}
        className={clsx(
          "cursor-pointer w-[160px] h-[42px] text-16pt font-regular text-f-gray-500 rounded-[15px] border border-f-gray-200 px-[20px] appearance-none outline-none  text-left",
          { "focus:ring-f-green-text focus:ring-[2px]": isOpen }
        )}
        style={{
          backgroundImage: `url(${icToggle})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
          backgroundSize: "30px 30px",
        }}
      />
      {isOpen && (
        <div
          onClick={handleClickInputButton}
          className="absolute bg-[#ffffff] w-[160px] rounded-[15px] border border-f-gray-200 z-1000 flex flex-col mt-[4px]"
        >
          {options.map((item, index) => (
            <button
              key={item.value}
              className={`flex items-center justify-center h-[42px] border-t border-f-gray-200 text-16pt font-regular text-f-black ${
                index === 0 ? "border-t-0" : ""
              }`}
              value={item.value}
              onClick={() => handleClickOption(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
