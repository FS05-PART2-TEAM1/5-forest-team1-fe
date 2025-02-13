import clsx from "clsx";
import Button from "./Button";

/**
 * usage : btn_restart, btn_pause
 */
const TimerCircleButton = ({ img, onClick, disabled }) => {
  const baseStyle = `${
    disabled ? "bg-f-gray-500" : "bg-f-brand"
  } rounded-full flex items-center justify-center w-[48px] h-[48px]`;
  const mobileStyle = "min-w-[48px] min-h-[48px]";
  const tabletStyle = "md:min-w-[64px] md:min-h-[64px]";

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
    </Button>
  );
};

export default TimerCircleButton;
