import "assets/fonts/font.css";

import { GlobalStyle } from "assets/styles/GlobalStyles";
import Navbar from "components/common/Navbar";
import Navigation from "components/common/Navigation";
import Home from "pages/Home";
import SelectPoList from "pages/SelectPoList";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import 'antd/dist/antd.min.css';
function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar></Navbar>
      <Main>
        <Navigation></Navigation>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/selectPoList" element={<SelectPoList />} />
            <Route path="/*" element={<p>Page Not Found</p>} />
          </Routes>
        </BrowserRouter>
      </Main>
    </>
  );
}

export default App;

const Main = styled.div`
  display: flex;
  height: 100%;
`;