import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/users/:id" element={<UserDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
