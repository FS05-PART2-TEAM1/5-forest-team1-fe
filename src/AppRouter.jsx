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

// 페이지 전환을 감지하는 컴포넌트
const PageTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const loadSequentially = async () => {
      setIsLoading(true);
      setShowContent(false);

      // 로딩 화면을 먼저 보여줌
      await new Promise((resolve) => setTimeout(resolve, 1600));

      setIsLoading(false);
      // 로딩이 끝난 후 컨텐츠를 보여줌 (스켈레톤 등의 자체 페이지 로딩 기능 시연을 위해 의도적으로 분리함)
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
