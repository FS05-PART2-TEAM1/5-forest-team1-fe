import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudyListPage from "./pages/StudyListPage";
import StudyDetailPage from "./pages/StudyDetailPage";
import StudyCreatePage from "./pages/StudyCreatePage";
import FocusPage from "./pages/FocusPage";
import HabitPage from "./pages/HabitPage";
import NotFound from "./pages/NotFound";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudyListPage />} />
        <Route path="/study">
          <Route path="create" element={<StudyCreatePage />} />
          <Route path=":studyId" element={<StudyDetailPage />} />
        </Route>
        <Route path="/focus" element={<FocusPage />} />
        <Route path="/habit" element={<HabitPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
