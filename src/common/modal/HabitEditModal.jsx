import { useState, useEffect } from "react";

const HabitEditModal = ({ isOpen, onClose, initialName, onSave }) => {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
    }
  }, [isOpen, initialName]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[20px] p-6 w-[320px]">
        <h3 className="text-lg font-bold mb-4 flex justify-center">
          습관 이름
        </h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded-2xl w-full"
        />
        <div className="mt-4 flex justify-between ">
          <button
            className="bg-gray-300  text-white px-4 py-2 rounded-[10px] w-[120px]"
            onClick={onClose}
          >
            닫기
          </button>
          <button
            className="bg-[#99C08E] text-white px-4 py-2 rounded-[10px] w-[120px]"
            onClick={() => onSave(name)}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitEditModal;
