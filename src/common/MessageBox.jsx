const ErrorMessage = ({ message }) => {
  return (
    <div className="w-fit bg-[#FDE0E9] text-[#F50E0E] px-7 py-3 rounded-2xl flex items-center gap-2 font-medium text-[14px] md:text-[16px]">
      <span>🚨</span>
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
