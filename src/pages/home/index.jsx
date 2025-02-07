import { Header } from "@/common/layout/Header";
import RecentViewedStudyContainer from "./RecentViewedStudyContainer";
import BrowseStudyContainer from "./BrowseStudyContainer";

function Home() {
  return (
    <div className="px-[16px] md:px-[24px] bg-f-bg pb-[40px] lg:pb-[160px]">
      <Header isCreateButton={true} />
      <RecentViewedStudyContainer />
      <BrowseStudyContainer />
    </div>
  );
}

export default Home;
