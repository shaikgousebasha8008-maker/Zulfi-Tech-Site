import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Login from "./pages/Login.jsx";
import Portal from "./pages/Portal.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/login" element={<Login />} />
      <Route path="/portal" element={<Portal />} />
    </Routes>
  );
}
