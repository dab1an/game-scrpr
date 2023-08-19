import Product from "./Components/Product.jsx";
import Navbar from "./Components/Navbar.jsx";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { AiFillHome } from "react-icons/ai";
import Home from "./Pages/Home.jsx";

function App() {
  return (
    <div className="app flex flex-col items-center w-full bg-white">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/test"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
