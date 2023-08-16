import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app flex flex-col items-center w-full bg-white">
      <BrowserRouter>
        <Routes>
          <Route path="/"></Route>
          <Route path="/market" element={<ExplorePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
