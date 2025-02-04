import clsx from "clsx";
import Button from "./Button";

/**
 * usage : btn_cancel, btn_modification
 */
const ModalButton = ({ children, onClick, isCancel }) => {
  const baseStyle = `${
    isCancel ? "bg-f-gray-200" : "bg-f-brand"
  } text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)] font-bold px-3 text-lg min-h-[58px] rounded-[16px]`;
  const mobileStyle = "min-w-[140px] ";
  const tabletStyle = "md:min-w-[312px]";

  return (
    <Button
      type={"button"}
      classNames={clsx(baseStyle, mobileStyle, tabletStyle)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ModalButton;
