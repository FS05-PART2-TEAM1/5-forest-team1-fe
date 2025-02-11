import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudyDetailPage from "./pages/StudyDetailPage";
import StudyCreatePage from "./pages/StudyCreatePage";
import NotFound from "./pages/NotFound";
import Home from "./pages/home";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study">
          <Route path="create" element={<StudyCreatePage />} />
          <Route path=":studyId" element={<StudyDetailPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
