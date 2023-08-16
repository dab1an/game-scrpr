import Product from "./Components/Product.jsx";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app flex flex-col items-center w-full bg-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product />}></Route>
          <Route path="/test"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
