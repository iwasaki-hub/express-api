import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import Home from "./pages/Home";

import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
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
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
