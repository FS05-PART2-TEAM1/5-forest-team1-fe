import { Header } from "@/common/layout/Header";
import { useParams } from "react-router-dom";

function StudyDetailPage() {
  const { studyId } = useParams();

  return (
    <div className="w-full h-screen bg-[#F6F4EF]">
      <Header></Header>
      <h1 className="text-3xl font-bold">스터디 상세 페이지</h1>
      <p>스터디 ID: {studyId}</p>
    </div>
  );
}

export default StudyDetailPage;
