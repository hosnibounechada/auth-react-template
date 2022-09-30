import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/nav-bar";
import Home from "./pages/home";
import Landing from "./pages/landing-page";
import Login from "./pages/login-page";
import Register from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
