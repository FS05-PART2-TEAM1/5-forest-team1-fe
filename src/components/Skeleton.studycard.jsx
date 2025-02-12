import clsx from "clsx";

const SkeletonStudyCard = ({ type = "browse" }) => {
  const typeStyle = type === "viewed" ? "md:min-w-[358px]" : "";
  const baseStyle =
    "rounded-[20px] relative flex flex-col justify-between bg-gray-100 animate-pulse";
  const mobileStyle = "h-[180px] min-w-[240px] p-[16px]";
  const tabletStyle = "md:h-[243px] md:p-[30px]";

  return (
    <div className={clsx(typeStyle, baseStyle, mobileStyle, tabletStyle)}>
      {/* points */}
      <div className="md:absolute md:right-[30px] mb-[6px]">
        <div className="w-[80px] h-[22px] bg-gray-300 rounded-full" />
      </div>
      {/* nickname */}
      {/* title */}
      <div className="mb-1 md:mb-2 flex md:flex-col md:items-start">
        <div className="w-[120px] h-[21px] mb-1 bg-gray-300 rounded-full" />
      </div>
      {/* date */}
      {/* <div className="w-[60px] h-[18px] md:h-[21px] mb-[10px] md:mb-[30px] bg-gray-300" /> */}
      {/* description */}
      <div className="w-full h-[22px] lg:h-[24px] bg-gray-300 rounded-full"></div>
      {/* emoji */}
      <div>
        <div className="w-[60px] h-[22px] bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

export default SkeletonStudyCard;
