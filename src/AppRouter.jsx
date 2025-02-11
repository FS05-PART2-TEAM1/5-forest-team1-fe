import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudyDetailPage from "./pages/StudyDetailPage";
import StudyCreatePage from "./pages/StudyCreatePage";
import FocusPage from "./pages/FocusPage";
import HabitPage from "./pages/HabitPage";
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
          <Route path=":studyId" element={<StudyDetailPage />} />
          <Route path="test" element={<TestPage />} />
        </Route>
        <Route path="/focus" element={<FocusPage />} />
        <Route path="/habit" element={<HabitPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
