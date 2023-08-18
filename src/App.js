import Product from "./Components/Product.jsx";
import Navbar from "./Components/Navbar.jsx";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app flex flex-col items-center w-full bg-white">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div>
                  <Product
                    title="Nintendo switch pro controller for blah blah blah blah blah blah blah blah blah blah blahl Blah"
                    productImage="https://picsum.photos/125/125"
                    price="$30"
                    salePrice="$20"
                    percentOff="%10"
                    link="https://www.amazon.com/Charger-Nintendo-Adapter-Compatible-Support/dp/B07MVG7H8V/ref=sr_1_1?qid=1692295792&refinements=p_n_deal_type%3A23566064011&rnid=23566063011&s=videogames&sr=1-1"
                  />
                </div>
              </div>
            }
          ></Route>
          <Route path="/test"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
