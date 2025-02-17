import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Footer } from "@/common/layout/Footer";
import Loading from "@/components/Loading";
import { useState, useEffect } from "react";
import StudyDetailPage from "./pages/StudyDetailPage";
import StudyCreatePage from "./pages/StudyCreatePage";
import StudyModifyPage from "./pages/StudyModifyPage";
import FocusPage from "./pages/FocusPage";
import HabitPage from "./pages/HabitPage";
import NotFound from "./pages/NotFound";
import Home from "./pages/home";
import TestPage from "./pages/TestPage";
import LandingPage from "./pages/LandingPage.jsx";
import JoinScreen from "./components/JoinScreen"; // 새로 추가한 JoinScreen
import ChatScreen from "./components/ChatScreen"; // 새로 추가한 ChatScreen

// 페이지 전환을 감지하는 컴포넌트
const PageTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const loadSequentially = async () => {
      // 현재 경로가 /이고 이전 경로가 /home일 때만 로딩 실행
      if (location.pathname === "/home" && location.state?.from === "/") {
        setIsLoading(true);
        setShowContent(false);

        await new Promise((resolve) => setTimeout(resolve, 1600));

        setIsLoading(false);
      }
      setShowContent(true);
    };

    loadSequentially();
  }, [location.pathname]);

  return (
    <>
      {isLoading && <Loading />}
      {showContent && children}
    </>
  );
};

function AppRouter() {
  return (
    <BrowserRouter>
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Home />} />
              {/* Chat 관련 라우트 추가 */}
              <Route path="/join" element={<JoinScreen />} />{" "}
              <Route path="/chat" element={<ChatScreen />} />{" "}
              <Route path="/study">
                <Route path="create" element={<StudyCreatePage />} />
                <Route path=":studyId" element={<StudyDetailPage />} />
                <Route path="test" element={<TestPage />} />
              </Route>
              <Route path="/focus" element={<FocusPage />} />
              <Route path="/habit" element={<HabitPage />} />
              <Route path="/modify" element={<StudyModifyPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </PageTransition>
    </BrowserRouter>
  );
}

export default AppRouter;
