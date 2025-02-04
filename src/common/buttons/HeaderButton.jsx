import clsx from "clsx";
import Button from "./Button";

/**
 * usage : btn_CTA
 */
const HeaderButton = ({ children, onClick }) => {
  const baseStyle =
    "bg-f-brand text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)] font-bold px-3";
  const mobileStyle = "min-w-[106px] min-h-[38px] rounded-[8px] text-sm";
  const tabletStyle =
    "md:min-w-[160px] md:min-h-[58px] md:rounded-[14px] md:text-lg";
  const pcStyle = "lg:min-w-[252px] lg:rounded-[16px]";

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

export default HeaderButton;
