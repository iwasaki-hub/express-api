import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import Home from "./pages/Home";

import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Study from "./pages/Study";
import MyPage from "./pages/MyPage";
import Usage from "./pages/Usage";
import Review from "./pages/Review";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <div className="app">
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserDetail />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/usage" element={<Usage />} />
              {/* ログイン必須のページ */}
              <Route element={<ProtectedRoute />}>
                <Route path="/study" element={<Study />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/review" element={<Review />} />
              </Route>
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
