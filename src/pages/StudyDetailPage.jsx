import { Header } from "@/common/layout/Header";
import { useParams } from "react-router-dom";
import arrowImg from "../assets/icons/ic_arrow.png";
import EmojiForm from "@/components/EmojiForm";
import PasswordModal from "@/common/modal/PasswordModal";
import { useEffect, useState } from "react";
import { getStudy } from "@/api/studyApi";
import { EarnedPointsBoxMd } from "@/common/EarnedPointsBox";
import ShareModal from "@/components/ShareModal";
import HabitTracker from "@/components/HabitTracker";

function StudyDetailPage() {
  window.scrollTo(0, 0);
  const { studyId } = useParams();
  const [studyData, setStudyData] = useState();
  const [isModal, setIsModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState();
  const [buttonName, setButtonName] = useState();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    const fetchStudy = async () => {
      const data = await getStudy(studyId);
      setStudyData(data);
      setTitle(data.nickname + "의 " + data.title);
    };
    fetchStudy();
  }, []);

  const enableModal = (e) => {
    setButtonName(e.currentTarget.dataset.name);
    setIsModal(true);
  };

  const disableModal = (e) => {
    setIsModal(false);
  };

  const enableShare = (e) => {
    setShareModal(true);
  };

  const disableShare = (e) => {
    setShareModal(false);
  };
  return (
    <div className="bg-f-bg">
      <Header />
      <div className="min-h-screen place-items-center py-10 md:py-20 ">
        <div className="bg-white w-[95%]  min-w-[380px] mx-auto rounded-[20px] p-6 md:p-10 shadow-lg md:max-w-[1248px]">
          <div className="flex md:flex-row flex-col-reverse justify-between gap-3">
            {studyData && (
              <>
                <EmojiForm studyId={studyId} />
                <div className="flex gap-4 md:justify-start justify-end mt-4">
                  <div
                    className="text-[#578246] text-16pt cursor-pointer"
                    onClick={enableShare}
                  >
                    공유하기
                  </div>
                  <div className="text-[#818181] text-16pt">|</div>
                  <div
                    className="text-[#578246] text-16pt cursor-pointer"
                    data-name="수정하러 가기"
                    onClick={(e) => enableModal(e)}
                  >
                    수정하기
                  </div>
                  <div className="text-[#818181] text-16pt">|</div>
                  <div
                    className="text-[#818181] text-16pt cursor-pointer"
                    onClick={(e) => enableModal(e)}
                    data-name="스터디 삭제하기"
                  >
                    스터디 삭제하기
                  </div>
                </div>
              </>
            )}
          </div>
          {!isLoading ? (
            studyData?.title ? (
              <>
                <div className="flex md:flex-row flex-col justify-between mt-8 gap-4">
                  <div className="md:text-32pt text-24pt font-extrabold">
                    {studyData.nickname + "의 " + studyData.title}
                  </div>
                  <div className="flex gap-4">
                    <div
                      className="flex items-center justify-center text-[#818181] border border-[#DDDDDD] md:w-[144px] w-[120px] rounded-2xl text-16pt md:h-[48px] h-[40px] cursor-pointer"
                      onClick={(e) => enableModal(e)}
                      data-name="오늘의 습관으로 가기"
                    >
                      오늘의 습관 <img src={arrowImg} className="ml-3" />
                    </div>
                    <div
                      className="flex items-center justify-center text-[#818181] border border-[#DDDDDD] md:w-[144px] w-[120px] rounded-2xl text-16pt cursor-pointer md:h-[48px] h-[40px] "
                      onClick={(e) => enableModal(e)}
                      data-name={"오늘의 집중으로 가기"}
                    >
                      오늘의 집중 <img src={arrowImg} className="ml-3" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-wrap">
                  <div className="text-[#818181] md:text-18pt text-16pt">
                    소개
                  </div>
                  <div className="break-all mt-2 md:text-18pt text-16pt">
                    {studyData.description}
                  </div>
                </div>
                <div className="mt-6 md:text-18pt text-16pt text-[#818181]">
                  현재까지 획득한 포인트
                </div>
                <div className="mt-2">
                  <EarnedPointsBoxMd points={studyData.totalPoints} />
                </div>
                <div className="mt-4 flex-grow">
                  <HabitTracker studyId={studyId} />
                </div>
              </>
            ) : (
              <>
                <div className="text-24pt text-center ">
                  존재하지 않는 스터디입니다.
                </div>
              </>
            )
          ) : (
            <div className="animate-pulse">
              {/* 제목 */}
              <div className="flex md:flex-row flex-col justify-between mt-8 gap-4">
                <div className="h-[30px] md:h-[40px] bg-gray-300 rounded w-[60%]"></div>
                <div className="flex gap-4">
                  <div className="h-[40px] md:h-[48px] bg-gray-300 rounded-lg w-[120px] md:w-[144px]"></div>
                  <div className="h-[40px] md:h-[48px] bg-gray-300 rounded-lg w-[120px] md:w-[144px]"></div>
                </div>
              </div>

              {/* 소개 (3줄) */}
              <div className="mt-4">
                <div className="h-[18px] md:h-[20px] bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-[18px] md:h-[20px] bg-gray-300 rounded w-5/6 mb-2"></div>
                <div className="h-[18px] md:h-[20px] bg-gray-300 rounded w-4/6"></div>
              </div>

              {/* 현재까지 획득한 포인트 */}
              <div className="mt-6">
                <div className="h-[24px] bg-gray-300 rounded w-[40%] md:w-[20%]"></div>
                <div className="h-[40px] md:h-[48px] bg-gray-300 rounded-lg w-[50%] md:w-[30%] mt-2"></div>
              </div>

              {/* 습관 트래커 */}
              <div className="mt-4">
                <div className="h-[250px] md:h-[300px] bg-gray-300 rounded-lg w-full"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isModal && (
        <PasswordModal
          isOpen={true}
          onClose={disableModal}
          title={title}
          buttonText={buttonName}
          studyId={studyId}
          studyData={studyData}
        />
      )}
      {shareModal && (
        <ShareModal
          onClose={disableShare}
          title={title}
          description={studyData.description}
        />
      )}
    </div>
  );
}

export default StudyDetailPage;
