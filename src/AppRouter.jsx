import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "@/common/layout/Footer";
import StudyDetailPage from "./pages/StudyDetailPage";
import StudyCreatePage from "./pages/StudyCreatePage";
import StudyModifyPage from "./pages/StudyModifyPage";
import FocusPage from "./pages/FocusPage";
import HabitPage from "./pages/HabitPage";
import NotFound from "./pages/NotFound";
import Home from "./pages/home";
import TestPage from "./pages/TestPage";
import LandingPage from "./pages/LandingPage.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default AppRouter;
