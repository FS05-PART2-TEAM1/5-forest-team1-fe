import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudyDetailPage from "./pages/StudyDetailPage";
import StudyCreatePage from "./pages/StudyCreatePage";
import FocusPage from "./pages/FocusPage";
import HabitPage from "./pages/HabitPage";
import NotFound from "./pages/NotFound";
import Home from "./pages/home";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study">
          <Route path="create" element={<StudyCreatePage />} />
          {/* 스터디 상세 페이지 테스트를 위해 경로 임시 변경 :studyId -> test*/}
          <Route path="test" element={<StudyDetailPage />} />
        </Route>
        <Route path="/focus" element={<FocusPage />} />
        <Route path="/habit" element={<HabitPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
