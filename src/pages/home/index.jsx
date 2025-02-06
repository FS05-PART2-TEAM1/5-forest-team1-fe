import axiosClient from "@/api/axios";
import { Header } from "@/common/layout/Header";
import StudyCard from "@/components/StudyCard";
import useLocalStorage from "@/hooks/useLocalStorage";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWheelScroll from "@/hooks/useWheelScroll";

/**
 * @todo: 검색 및 정렬 추가
 * @todo: 페이지네이션 추가
 * @todo: ui 디자인 및 컴포넌트 분리
 */
function Home() {
  const navigate = useNavigate();
  const [viewedStudyIds, setViewedStudyIds] = useLocalStorage(
    "viewed_study_ids",
    []
  );
  const [studies, setStudies] = useState({
    studies: [],
    total: 0,
    currentPage: 1,
    totalPages: 1,
  });
  const [viewedStudies, setViewedStudies] = useState({
    studies: [],
    total: 0,
  });
  const hasBrowseStudy = studies?.studies?.length > 0;
  const hasViewedStudy = viewedStudyIds?.length > 0;

  const { scrollRef } = useWheelScroll();

  useEffect(() => {
    if (!hasViewedStudy) return;

    const fetchViewedStudies = async () => {
      const ids = viewedStudyIds.join(",");
      const response = await axiosClient.get(
        `/api/studies/recent?studyIds=${ids}`
      );
      const sortedStudies = viewedStudyIds
        .map((id) => response.data.studies.find((study) => study.id === id))
        .filter(Boolean);
      setViewedStudies({ ...response.data, studies: sortedStudies });
    };

    fetchViewedStudies();
  }, [viewedStudyIds]);

  useEffect(() => {
    const fetchStudies = async () => {
      const response = await axiosClient.get("/api/studies");
      setStudies({ ...response.data });
    };

    fetchStudies();
  }, []);

  const handleClickStudyCard = (studyId) => {
    setViewedStudyIds((prevViewedStudies) => {
      const filteredStudies = prevViewedStudies.filter((id) => id !== studyId);
      return [studyId, ...filteredStudies].slice(0, 3);
    });

    navigate(`studies/${studyId}`);
  };

  return (
    <div>
      <Header isCreateButton={true} />
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

      <div className="max-w-[1200px] px-[38px]">
        스터디 둘러보기
        <div
          className={clsx("min-h-[405px] md:min-h-[623px]", {
            "flex items-center justify-center": !hasBrowseStudy,
            "grid md:grid-cols-2 lg:grid-cols-3 gap-y-[16px] md:gap-[24px]":
              hasBrowseStudy,
          })}
        >
          {hasBrowseStudy ? (
            studies?.studies.map((item) => (
              <StudyCard
                key={item.id}
                study={item}
                onClick={() => handleClickStudyCard(item.id)}
              ></StudyCard>
            ))
          ) : (
            <div className="text-16pt md:text-20pt font-regular text-f-gray-500">
              아직 둘러 볼 스터디가 없어요
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
