import StudyCard from "@/components/StudyCard";
import clsx from "clsx";
import useWheelScrollBar from "@/hooks/useWheelScrollBar";

const RecentViewedStudySection = ({ studies, onClickCard }) => {
  const hasViewedStudy = studies?.studies?.length > 0;
  const itemWidth = 240; // 카드 가로 크기 (미디어 쿼리에 맞게 조정 가능)
  const { scrollRef, currentIndex, scrollToIndex } = useWheelScrollBar(
    studies?.studies?.length || 0,
    itemWidth
  );

  return (
    <div
      className={clsx(
        "relative max-w-[1200px] min-h-[247px] md:min-h-[338px] lg:min-h-[382px] px-4 pt-4 pb-8 md:px-6 md:pt-6 md:pb-10 lg:p-10 mx-auto bg-[#ffffff] rounded-[20px] mb-[16px] md:mb-[24px] lg:mb-[40px] ",
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
        className="flex gap-[16px] md:gap-[24px] overflow-x-auto [&::-webkit-scrollbar]:hidden pt-[14px] md:pt-[18px] "
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
      {/* 포인트 네비게이션 */}
      {hasViewedStudy && (
        <div className="absolute bottom-3 md:bottom-[14px] lg:bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
          {studies.studies.map((_, index) => (
            <button
              key={index}
              // onClick={() => scrollToIndex(index)}
              className={clsx(
                "w-2 h-2 lg:w-[10px] lg:h-[10px] rounded-full transition-all",
                currentIndex === index
                  ? "bg-f-green-text scale-110"
                  : "bg-gray-300"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentViewedStudySection;
