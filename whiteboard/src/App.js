import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Drawings from "./pages/Drawings";
import Navbar from "./components/Navbar";
import DrawingDetails from "./pages/DrawingDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/drawings" element={<Drawings />}></Route>
            <Route path="/drawing-details" element={<DrawingDetails />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
