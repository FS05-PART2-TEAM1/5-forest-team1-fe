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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (viewedStudyIds.length <= 0) {
      setTimeout(() => {
        setLoading(false);
      }, 400);
      return;
    }

    const fetchViewedStudies = async () => {
      const ids = viewedStudyIds.join(",");

      axiosClient
        .get(`/api/studies/recent?studyIds=${ids}`)
        .then((response) => {
          setTimeout(() => {
            const sortedStudies = viewedStudyIds
              .map((id) =>
                response.data.studies.find((study) => study.id === id)
              )
              .filter(Boolean);
            setViewedStudies({ ...response.data, studies: sortedStudies });
            setLoading(false);
          }, 400);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });
    };

    fetchViewedStudies();
  }, [viewedStudyIds]);

  const addRecentStudyId = (studyId) => {
    setViewedStudyIds((prevViewedStudies) => {
      const filteredStudies = prevViewedStudies.filter((id) => id !== studyId);
      return [studyId, ...filteredStudies].slice(0, MAX_RECENT_COUNT);
    });
  };

  return [viewedStudies, loading, error, addRecentStudyId];
};

export default useFetchRecentViewedStudies;
