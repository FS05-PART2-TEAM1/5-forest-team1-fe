const ErrorMessage = ({ message, isCompleted }) => {
  return (
    <div
      className={`w-fit ${
        isCompleted
          ? "bg-[#E1EDDE] text-[#578246]"
          : "bg-[#FDE0E9] text-[#F50E0E]"
      } px-7 py-3 rounded-2xl flex items-center gap-2 mt-[297px] md:mt-[129px] lg:mt-[65.5px] font-medium text-[14px] md:text-[16px] mx-auto`}
    >
      <span>{isCompleted ? "🎉" : "🚨"}</span>
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
