import "assets/fonts/font.css";

import { GlobalStyle } from "assets/styles/GlobalStyles";
import Navbar from "components/common/Navbar";
import Home from "pages/Home";
import SelectPoList from "pages/SelectPoList";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/selectPoList" element={<SelectPoList />} />
          <Route path="/*" element={<p>Page Not Found</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
