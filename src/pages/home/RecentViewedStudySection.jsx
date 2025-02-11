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
    <div className="relative max-w-[1200px] min-h-[247px] px-4 pt-4 pb-9 mx-auto bg-white rounded-lg mb-6">
      <span className="text-lg font-bold">최근 조회한 스터디</span>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden pt-4"
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
          <div className="text-lg text-gray-500">
            아직 조회한 스터디가 없어요
          </div>
        )}
      </div>

      {/* 포인트 네비게이션 */}
      {hasViewedStudy && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
          {studies.studies.map((_, index) => (
            <button
              key={index}
              // onClick={() => scrollToIndex(index)}
              className={clsx(
                "w-2 h-2 rounded-full transition-all",
                currentIndex === index
                  ? "bg-f-green-text scale-125"
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
