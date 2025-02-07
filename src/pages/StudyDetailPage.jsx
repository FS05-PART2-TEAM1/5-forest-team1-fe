import { Header } from "@/common/layout/Header";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import arrowImg from "../assets/icons/ic_arrow.png";
import EmojiForm from "@/components/EmojiForm";
import PasswordModal from "@/common/modal/PasswordModal";
import { useEffect, useState } from "react";
import { getStudy } from "@/api/studyApi";
import { EarnedPointsBoxMd } from "@/common/EarnedPointsBox";

function StudyDetailPage() {
  const { studyId } = useParams();
  const [studyData, setStudyData] = useState();
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState();
  const [buttonName, setButtonName] = useState();
  useEffect(() => {
    const fetchStudy = async () => {
      const data = await getStudy(studyId);
      setStudyData(data);
      setIsLoading(false);
    };
    fetchStudy();
    // setTitle(studyData.nickname + "의 " + studyData.title)
  }, []);
  const enableModal = (e) => {
    setButtonName(e.target.dataset.name);
    setIsModal(true);
  };
  const disableModal = (e) => {
    setIsModal(false);
  };

  return (
    <div className="w-full h-screen bg-[#F6F4EF]">
      <Header />
      {!isLoading && (
        <div className="grid place-items-center mt-14">
          <div className="bg-white lg:max-w-[1200px] lg:w-9/12 md:w-10/12 w-11/12 md: rounded-[20px] lg:p-10 md:p-6 p-4">
            <div className="flex md:flex-row flex-col-reverse justify-between gap-3">
              <EmojiForm studyId={studyId} />
              <div className="flex gap-4 md:justify-start justify-end mt-4">
                <div className="text-[#578246] text-16pt">공유하기</div>
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
            </div>
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
            <div className="mt-4 ">
              <div className="text-[#818181] md:text-18pt text-16pt">소개</div>
              <div className="mt-2 md:text-18pt text-16pt">
                {studyData.description}
              </div>
            </div>
            <div className="mt-6 md:text-18pt text-16pt text-[#818181]">
              현재까지 획득한 포인트
            </div>
            <div className="mt-2">
              <EarnedPointsBoxMd points={studyData.totalPoints} />
            </div>
          </div>
        </div>
      )}
      {isModal && (
        <PasswordModal
          isOpen={true}
          onClose={disableModal}
          title={title}
          studyId={studyId}
          buttonText={buttonName}
        />
      )}
    </div>
  );
}

export default StudyDetailPage;
