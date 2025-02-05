import clsx from "clsx";
import Button from "./Button";

/**
 * usage : btn_confirm
 */
const ConfirmButton = ({ children, onClick }) => {
  const baseStyle = `bg-f-brand text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)] font-bold px-3 text-lg min-h-[58px] rounded-[16px]`;
  const mobileStyle = "min-w-[140px] ";
  const tabletStyle = "md:min-w-[312px]";
  const pcStyle = "lg:min-w-[600px]";

  return (
    <Button
      type={"button"}
      classNames={clsx(baseStyle, mobileStyle, tabletStyle, pcStyle)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ConfirmButton;
