import { Header } from "@/common/layout/Header";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import arrowImg from "../assets/icons/ic_arrow.png";
import EmojiForm from "@/components/EmojiForm";

function StudyDetailPage() {
  const { studyId } = useParams();

  return (
    <div className="w-full h-screen bg-[#F6F4EF]">
      <Header></Header>
      <div className="grid place-items-center mt-14">
        <div className="bg-white lg:max-w-[1200px] lg:w-9/12 md:w-10/12 w-11/12 md: rounded-[20px] lg:p-10 md:p-6 p-4">
          <div className="flex md:flex-row flex-col-reverse justify-between gap-3">
            <EmojiForm />
            <div className="flex gap-4 md:justify-start justify-end mt-4">
              <Link to="" className="text-[#578246] text-16pt">
                공유하기
              </Link>
              <div className="text-[#818181] text-16pt">|</div>
              <Link to="" className="text-[#578246] text-16pt">
                수정하기
              </Link>
              <div className="text-[#818181] text-16pt">|</div>
              <Link to="" className="text-[#818181] text-16pt">
                스터디 삭제하기
              </Link>
            </div>
          </div>
          <div className="flex md:flex-row flex-col justify-between mt-8 gap-4">
            <div className="md:text-32pt text-24pt font-extrabold">스터디 이름</div>
            <div className="flex gap-4">
              <div className="flex items-center justify-center text-[#818181] border border-[#DDDDDD] md:w-[144px] w-[120px] rounded-2xl text-16pt md:h-[48px] h-[40px]">
                오늘의 습관 <img src={arrowImg} className="ml-3" />
              </div>
              <div className="flex items-center justify-center text-[#818181] border border-[#DDDDDD] md:w-[144px] w-[120px] rounded-2xl text-16pt">
                오늘의 집중 <img src={arrowImg} className="ml-3" />
              </div>
            </div>
          </div>
          <div className="mt-4 ">
            <div className="text-[#818181] md:text-18pt text-16pt">
              소개
            </div>
            <div className="md:text-18pt text-16pt">
              Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅
            </div>
          </div>
          <div className="mt-6 md:text-18pt text-16pt text-[#818181]">현재까지 획득한 포인트</div>
          
        </div>
      </div>
    </div>
  );
}

export default StudyDetailPage;
