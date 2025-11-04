import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Review from "./pages/Review";
import MainLayout from "./layouts/MainLayout";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="review" element={<Review />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
