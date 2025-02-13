import StudyCard from "@/components/StudyCard";
import clsx from "clsx";
import icSearch from "@assets/icons/ic_search.png";
import Select from "@/components/Select";
import SkeletonStudyCard from "@/components/Skeleton.studycard";

const BrowseStudySection = ({ children }) => {
  return (
    <div className="max-w-[1200px] p-[16px] md:p-[24px] lg:p-[40px] mx-auto bg-[#ffffff] rounded-[20px]">
      <div className="text-16pt md:text-24pt text-f-black font-bold mb-[16px] md:mb-[24px]">
        스터디 둘러보기
      </div>
      {children}
    </div>
  );
};

BrowseStudySection.Filter = ({
  localKeyword,
  handleChangeSearchValue,
  selectedOption,
  handleChangeSelectedOption,
}) => {
  return (
    <div className="flex flex-col items-end gap-[12px] md:flex-row md:items-center md:justify-between mb-[12px] md:mb-[24px]">
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
      <Select
        selected={selectedOption}
        onClick={(option) => handleChangeSelectedOption(option)}
        options={[
          { value: "newest", label: "최신 순" },
          { value: "oldest", label: "오래된 순" },
          { value: "mostPoints", label: "많은 포인트 순" },
          { value: "leastPoints", label: "적은 포인트 순" },
        ]}
      />
    </div>
  );
};

BrowseStudySection.Content = ({ studies, error, handleClickStudyCard }) => {
  const hasBrowseStudy = studies?.studies?.length > 0;

  return (
    <div
      className={clsx("min-h-[405px] md:min-h-[510px] mb-[30px] md:mb-[60px]", {
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
          {!error
            ? "아직 둘러 볼 스터디가 없어요"
            : "서버에 문제가 발생했습니다 😥"}
        </div>
      )}
    </div>
  );
};

BrowseStudySection.Pagination = ({
  currentPage,
  totalPage,
  handlePageChange,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPage, startPage + 4);
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 md:px-4 py-1 md:py-2 border rounded ${
            i === currentPage ? "bg-f-brand text-[#ffffff]" : ""
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };
  return (
    <div className="flex justify-center mt-6 gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-3 md:px-4 py-1 md:py-2 border rounded disabled:opacity-50"
      >
        이전
      </button>
      {renderPageNumbers()}
      <button
        disabled={currentPage === totalPage}
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-3 md:px-4 py-1 md:py-2 border rounded disabled:opacity-50"
      >
        다음
      </button>
    </div>
  );
};

BrowseStudySection.Loading = ({}) => {
  return (
    <div
      className={clsx(
        "min-h-[405px] md:min-h-[510px] mb-[30px] md:mb-[60px] grid md:grid-rows-2 md:grid-cols-2 lg:grid-cols-3 gap-y-[16px] md:gap-[24px]"
      )}
    >
      <SkeletonStudyCard />
      <SkeletonStudyCard />
      <SkeletonStudyCard />
      <SkeletonStudyCard />
      <SkeletonStudyCard />
      <SkeletonStudyCard />
    </div>
  );
};

export default BrowseStudySection;
