import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/layout/Header";
import Board from "./pages/Board";
import Write from "./pages/Write";

import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/write" element={<Write isWrite={true} />} />
          <Route path="/edit" element={<Write isWrite={false} />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
