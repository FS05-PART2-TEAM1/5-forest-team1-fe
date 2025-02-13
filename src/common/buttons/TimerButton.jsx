import clsx from "clsx";
import Button from "./Button";

/**
 * usage : btn_start, btn_stop
 */
const TimerButton = ({ children, img, onClick, disabled }) => {
  const baseStyle = `${
    disabled ? "bg-f-gray-500" : "bg-f-brand"
  } text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)] font-bold px-3 flex items-center justify-center gap-4`;
  const mobileStyle =
    "min-w-[140px] min-h-[45px] rounded-[30.48px] text-lg mb-[50px]";
  const tabletStyle =
    "md:min-w-[333px] md:min-h-[60px] md:rounded-[50px] md:text-2xl md:mb-[40px]";

  return (
    <Button
      type={"button"}
      classNames={clsx(baseStyle, mobileStyle, tabletStyle)}
      onClick={onClick}
    >
      {img && (
        <img
          src={img}
          alt=""
          className="x-[24px] md:x-[44px] h-[24px] md:h-[44px]"
        />
      )}
      {children}
    </Button>
  );
};

export default TimerButton;
