import StudyCard from "@/components/StudyCard";
import clsx from "clsx";
import useWheelScroll from "@/hooks/useWheelScroll";

const RecentViewedStudySection = ({ studies, onClickCard }) => {
  const hasViewedStudy = studies?.studies?.length > 0;
  const { scrollRef } = useWheelScroll();

  return (
    <div
      className={clsx(
        "relative max-w-[1200px] min-h-[247px] md:min-h-[338px] lg:min-h-[382px] p-[16px] md:p-[24px] lg:p-[40px] mx-auto bg-[#ffffff] rounded-[20px] mb-[16px] md:mb-[24px] lg:mb-[40px] ",
        {
          "flex items-center justify-center": !hasViewedStudy,
        }
      )}
    >
      <span
        className={clsx("text-16pt md:text-24pt text-f-black font-bold", {
          "absolute top-[16px] md:top-[24px] left-[16px] md:left-[24px] lg:left-[40px]":
            !hasViewedStudy,
        })}
      >
        최근 조회한 스터디
      </span>
      <div
        ref={scrollRef}
        className="flex gap-[16px] md:gap-[24px] overflow-x-auto [&::-webkit-scrollbar]:hidden pt-[14px] md:pt-[18px] md:pt-[30px]"
      >
        {hasViewedStudy ? (
          studies.studies.map((item) => (
            <StudyCard
              key={item.id}
              study={item}
              type={"viewed"}
              onClick={() => onClickCard(item.id)}
            />
          ))
        ) : (
          <div className="text-16pt md:text-20pt font-regular text-f-gray-500">
            아직 조회한 스터디가 없어요
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentViewedStudySection;
