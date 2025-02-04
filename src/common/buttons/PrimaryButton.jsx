import clsx from "clsx";
import Button from "./Button";

/**
 * usage : btn_habit, btn_focus, btn_make, btn_modification
 */
const PrimaryButton = ({ children, onClick }) => {
  const baseStyle =
    "bg-f-brand text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)] font-bold rounded-[16px] min-h-[58px] text-lg min-w-[312px] md:w-[648px]";
  const pcStyle = "lg:min-w-[648px]";

  return (
    <Button
      type={"button"}
      classNames={clsx(baseStyle, pcStyle)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
