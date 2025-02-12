import { useNavigate } from "react-router-dom";
import useFetchRecentViewedStudies from "@/hooks/useFetchRecentViewedStudies";
import RecentViewedStudySection from "./RecentViewedStudySection";

const RecentViewedStudyContainer = () => {
  const navigate = useNavigate();
  const [viewedStudies, loading, error, addRecentStudyId] =
    useFetchRecentViewedStudies();

  const handleClickStudyCard = (studyId) => {
    addRecentStudyId(studyId);
    navigate(`study/${studyId}`);
  };

  return (
    <RecentViewedStudySection
      studies={viewedStudies}
      loading={loading}
      error={error}
      onClickCard={(id) => handleClickStudyCard(id)}
    />
  );
};

export default RecentViewedStudyContainer;
