import StudyCard from "@/components/StudyCard";
import { useDebounce } from "@/hooks/useDebounce";
import useFetchBrowseStudies from "@/hooks/useFetchBrowseStudies";
import useFetchRecentViewedStudies from "@/hooks/useFetchRecentViewedStudies";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrowseStudySection from "./BrowseStudySection";

const BrowseStudyContainer = () => {
  const navigate = useNavigate();
  const [_, addRecentStudyId] = useFetchRecentViewedStudies();

  const [localKeyword, setLocalKeyword] = useState("");
  const [selectedOption, setSelectedOption] = useState("newest");
  const [totalPage, setTotalPage] = useState(1);

  const [studies, setParams] = useFetchBrowseStudies({
    page: 1,
    pageSize: 6,
    keyword: "",
    sortBy: "createdAt",
  });

  const debouncedKeyword = useDebounce(localKeyword, 500);
  const currentPage = studies.currentPage;

  useEffect(() => {
    if (studies?.totalPages) {
      setTotalPage((prev) =>
        prev === studies.totalPages ? prev : studies.totalPages
      );
    }
  }, [studies]);

  useEffect(() => {
    setParams((prev) => {
      const newParams = { ...prev, keyword: debouncedKeyword, page: 1 };
      return JSON.stringify(newParams) === JSON.stringify(prev)
        ? prev
        : newParams;
    });
  }, [debouncedKeyword]);

  const handleClickStudyCard = (studyId) => {
    addRecentStudyId(studyId);
    navigate(`studies/${studyId}`);
  };

  const handleChangeSearchValue = (e) => {
    setLocalKeyword(e.target.value);
  };

  const handleChangeSelectedOption = (e) => {
    const option = e.target.value;
    setSelectedOption(option);
    setParams((prev) => ({
      ...prev,
      sortBy: option,
      page: 1,
    }));
    handlePageChange(1);
  };

  const handlePageChange = (newPage) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <BrowseStudySection>
      <BrowseStudySection.Filter
        {...{
          localKeyword,
          handleChangeSearchValue,
          selectedOption,
          handleChangeSelectedOption,
        }}
      />
      <BrowseStudySection.Content {...{ studies, handleClickStudyCard }} />
      <BrowseStudySection.Pagination
        {...{
          currentPage,
          totalPage,
          handlePageChange,
        }}
      />
    </BrowseStudySection>
  );
};

export default BrowseStudyContainer;
