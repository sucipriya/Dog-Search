import { BrowserRouter, Routes, Route } from "react-router-dom";
import Listing from "./pages/listing";
import MyPetDetail from "./pages/listing/petdetails";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Listing />}>
          <Route path="/:name" element={<MyPetDetail />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
