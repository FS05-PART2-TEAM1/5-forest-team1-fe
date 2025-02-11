import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudyDetailPage from "./pages/StudyDetailPage";
import StudyCreatePage from "./pages/StudyCreatePage";
import NotFound from "./pages/NotFound";
import Home from "./pages/home";
import TestPage from "./pages/TestPage";
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study">
          <Route path="create" element={<StudyCreatePage />} />
          {/* 스터디 상세 페이지 테스트를 위해 경로 임시 변경 :studyId -> test*/}
          <Route path="test" element={<TestPage />} />
          <Route path=":studyId" element={<StudyDetailPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
