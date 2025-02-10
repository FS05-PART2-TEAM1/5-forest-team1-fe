import axiosClient from "@/api/axios";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";

const MAX_RECENT_COUNT = 5;

const useFetchRecentViewedStudies = () => {
  const [viewedStudyIds, setViewedStudyIds] = useLocalStorage(
    "viewed_study_ids",
    []
  );
  const [viewedStudies, setViewedStudies] = useState({
    studies: [],
    total: 0,
  });

  useEffect(() => {
    if (viewedStudyIds.length <= 0) return;

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

  const addRecentStudyId = (studyId) => {
    setViewedStudyIds((prevViewedStudies) => {
      const filteredStudies = prevViewedStudies.filter((id) => id !== studyId);
      return [studyId, ...filteredStudies].slice(0, MAX_RECENT_COUNT);
    });
  };

  return [viewedStudies, addRecentStudyId];
};

export default useFetchRecentViewedStudies;
