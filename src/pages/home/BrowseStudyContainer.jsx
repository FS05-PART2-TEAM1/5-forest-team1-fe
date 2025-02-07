import StudyCard from "@/components/StudyCard";
import { useDebounce } from "@/hooks/useDebounce";
import useFetchBrowseStudies from "@/hooks/useFetchBrowseStudies";
import useFetchRecentViewedStudies from "@/hooks/useFetchRecentViewedStudies";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import icSearch from "@assets/icons/ic_search.png";
import icToggle from "@assets/icons/ic_toggle.png";

/**
 * @todo: 검색 및 정렬 추가
 * @todo: 페이지네이션 추가
 * @todo: ui 디자인 및 컴포넌트 분리
 */
const BrowseStudyContainer = () => {
  const navigate = useNavigate();
  const [_, addRecentStudyId] = useFetchRecentViewedStudies();

  const [localKeyword, setLocalKeyword] = useState("");
  const [selectedOption, setSelectedOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [studies, setParams] = useFetchBrowseStudies({
    page: 1,
    pageSize: 6,
    keyword: "",
    sortBy: "createdAt",
  });
  const hasBrowseStudy = studies?.studies?.length > 0;

  const debouncedKeyword = useDebounce(localKeyword, 500);

  useEffect(() => {
    if (studies?.totalPages) {
      setTotalPage(studies.totalPages);
    }
  }, [studies]);

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      keyword: debouncedKeyword,
      page: 1,
    }));
  }, [debouncedKeyword]);

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      sortBy: selectedOption,
      page: 1,
    }));
  }, [selectedOption]);

  const handleClickStudyCard = (studyId) => {
    addRecentStudyId(studyId);
    navigate(`studies/${studyId}`);
  };

  const handleChangeSearchValue = (e) => {
    setLocalKeyword(e.target.value);
  };

  const handleChangeSelectedOption = (e) => {
    setSelectedOption(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPage, startPage + 4);
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 border rounded ${
            i === currentPage ? "bg-gray-300" : ""
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="max-w-[1200px] px-[38px]">
      <div>스터디 둘러보기</div>
      <div className="flex flex-col items-end gap-[12px] md:flex-row md:items-center md:justify-between">
        <div className="relative w-full">
          <input
            value={localKeyword}
            placeholder="검색"
            onChange={(e) => handleChangeSearchValue(e)}
            className="h-[42px] w-full md:w-[335px] rounded-[15px] border border-f-gray-200 pl-[40px] focus:outline-none focus:ring-f-green-text focus:ring-[2px] placeholder-f-gray-500 text-16pt font-regular"
          />
          <img
            src={icSearch}
            alt=""
            className="absolute w-[18px] h-[18px] left-[12px] top-1/2 -translate-y-1/2"
          />
        </div>
        <select
          style={{
            backgroundImage: `url(${icToggle})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
            backgroundSize: "30px 30px",
          }}
          className={`w-[180px] h-[42px] text-16pt font-regular text-f-gray-500 rounded-[15px] border border-f-gray-200 px-[20px] appearance-none outline-none focus:ring-f-green-text focus:ring-[2px]`}
          value={selectedOption}
          onChange={(e) => handleChangeSelectedOption(e)}
        >
          <option value="newest">최근 순</option>
          <option value="oldest">오래된 순</option>
          <option value="mostPoints">많은 포인트 순</option>
          <option value="leastPoints">적은 포인트 순</option>
        </select>
      </div>
      <div
        className={clsx("min-h-[405px] md:min-h-[623px]", {
          "flex items-center justify-center": !hasBrowseStudy,
          "grid md:grid-rows-2 md:grid-cols-2 lg:grid-cols-3 gap-y-[16px] md:gap-[24px]":
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
      <div className="flex justify-center mt-6 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          이전
        </button>
        {renderPageNumbers()}
        <button
          disabled={currentPage === totalPage}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default BrowseStudyContainer;
