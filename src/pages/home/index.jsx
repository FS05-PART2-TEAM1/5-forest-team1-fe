import { Header } from "@/common/layout/Header";
import RecentViewedStudyContainer from "./RecentViewedStudyContainer";
import BrowseStudyContainer from "./BrowseStudyContainer";

function Home() {
  return (
    <div>
      <Header isCreateButton={true} />
      <RecentViewedStudyContainer />
      <BrowseStudyContainer />
    </div>
  );
}

export default Home;
