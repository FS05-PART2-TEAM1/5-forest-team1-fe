import StudyCard from "@/components/StudyCard";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import useWheelScroll from "@/hooks/useWheelScroll";
import useFetchRecentViewedStudies from "@/hooks/useFetchRecentViewedStudies";

const RecentViewedStudyContainer = () => {
  const navigate = useNavigate();
  const [viewedStudies, addRecentStudyId] = useFetchRecentViewedStudies();
  const hasViewedStudy = viewedStudies?.studies?.length > 0;
  const { scrollRef } = useWheelScroll();

  const handleClickStudyCard = (studyId) => {
    addRecentStudyId(studyId);
    navigate(`studies/${studyId}`);
  };

  return (
    <div
      className={clsx(
        "relative max-w-[1200px] min-h-[247px] md:min-h-[338px] lg:min-h-[382px] p-[16px] md:p-[24px] lg:p-[40px]",
        {
          "flex items-center justify-center": !hasViewedStudy,
        }
      )}
    >
      <span
        className={clsx({
          "absolute top-[16px] md:top-[24px] left-[16px] md:left-[24px] lg:left-[40px]":
            !hasViewedStudy,
        })}
      >
        최근 조회한 스터디
      </span>
      <div
        ref={scrollRef}
        className="flex gap-[16px] md:gap-[24px] overflow-x-auto [&::-webkit-scrollbar]:hidden"
      >
        {hasViewedStudy ? (
          viewedStudies.studies.map((item) => (
            <StudyCard
              key={item.id}
              study={item}
              type={"viewed"}
              onClick={() => handleClickStudyCard(item.id)}
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

export default RecentViewedStudyContainer;
