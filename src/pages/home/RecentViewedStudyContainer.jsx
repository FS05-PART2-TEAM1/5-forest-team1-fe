import { useNavigate } from "react-router-dom";
import useFetchRecentViewedStudies from "@/hooks/useFetchRecentViewedStudies";
import RecentViewedStudySection from "./RecentViewedStudySection";

const RecentViewedStudyContainer = () => {
  const navigate = useNavigate();
  const [viewedStudies, addRecentStudyId] = useFetchRecentViewedStudies();

  const handleClickStudyCard = (studyId) => {
    addRecentStudyId(studyId);
    navigate(`studies/${studyId}`);
  };

  return (
    <RecentViewedStudySection
      studies={viewedStudies}
      onClickCard={(id) => handleClickStudyCard(id)}
    />
  );
};

export default RecentViewedStudyContainer;
