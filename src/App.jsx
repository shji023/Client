import "assets/fonts/font.css";
import "antd/dist/antd.min.css";
import "App.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  EditFilled,
  ScheduleFilled,
  SoundFilled,
  ReconciliationFilled,
  BarChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { GlobalStyle } from "assets/styles/GlobalStyles";
import SelectPoList from "pages/SelectPoList";
import PoRegist from "pages/PoRegist";
import SuccessBid from "pages/SuccessBid";
import SelectPrList from "pages/SelectPrList";
import CreatePr from "pages/CreatePr";
import SelectRFQList from "pages/SelectRFQList";
import SelectBidList from "pages/SelectBidList";
import RfqDetail from "pages/RfqDetail";
import BidDetail from "pages/BidDetail";
import RfqCreate from "pages/RfqCreate";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BidWrite from "pages/BidWrite";
import DashBoard from "pages/DashBoard";
import { POSCO_ICT_CI_ENG, ProfileIcon, SearchIcon, NoticeIcon } from "assets/images";
import Login from "pages/Login";
import { Header } from "antd/lib/layout/layout";
import Home from "pages/Home";
import { getCookie, removeCookie } from "util/cookie";
import PrivateRoute from "pages/PrivateRoute";

function App() {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const item2 = [
    {
      label: "구매신청",
      key: "PrSubMenu",
      icon: <EditFilled />,
      children: [
        {
          type: "group",
          label: (
            <a href="/createPr" rel="noopener noreferrer">
              ⦁ &nbsp;구매신청등록
            </a>
          ),
        },
        {
          type: "group",
          label: (
            <a href="/selectPrList" rel="noopener noreferrer">
              ⦁ &nbsp;구매신청조회
            </a>
          ),
        },
      ],
    },
    {
      label: "RFQ",
      key: "RfqSubMenu",
      icon: <ScheduleFilled />,
      children: [
        {
          type: "group",
          label: (
            <a href="/selectRFQList" rel="noopener noreferrer">
              ⦁ &nbsp;RFQ조회
            </a>
          ),
        },
      ],
    },
    {
      label: "입찰",
      key: "BidSubMenu",
      icon: <SoundFilled />,
      children: [
        {
          type: "group",
          label: (
            <a href="/bidList" rel="noopener noreferrer">
              ⦁ &nbsp;입찰진행현황조회
            </a>
          ),
        },
      ],
    },
    {
      label: "구매계약",
      key: "PoSubMenu",
      icon: <ReconciliationFilled />,
      children: [
        {
          type: "group",
          label: (
            <a href="/poRegist" rel="noopener noreferrer">
              ⦁ &nbsp;구매계약등록
            </a>
          ),
        },
        {
          type: "group",
          label: (
            <a href="/selectPoList" rel="noopener noreferrer">
              ⦁ &nbsp;구매계약조회
            </a>
          ),
        },
      ],
    },
    {
      label: "DashBoard",
      key: "DashBoardSubMenu",
      icon: <BarChartOutlined />,
      children: [
        {
          type: "group",
          label: (
            <a href="/dashboard" rel="noopener noreferrer">
              ⦁ &nbsp;대시보드 조회
            </a>
          ),
        },
      ],
    },
  ];
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      removeCookie("loginToken");
      removeCookie("authority");
      removeCookie("email");
      removeCookie("site_id");
      navigate("/");
    }
  };
  const userRole =
    getCookie("authority") === "ROLE_USER"
      ? "사용부서"
      : getCookie("authority") === "ROLE_BUYER"
      ? "바이어"
      : "공급사";
  return (
    <>
      <GlobalStyle />
      <StyledRoot>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          {/* <div className="logo" /> */}
          <Logo>
            <img className="logo" src={POSCO_ICT_CI_ENG} alt="POSCO_ICT_CI_ENG"></img>
          </Logo>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} items={item2} />
        </Sider>
        <Layout className="site-layout">
          <StyledHeader
            className="site-layout-background"
            style={{
              padding: 0,
              boxShadow: "0px 0px 10px -5px gray",
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            })}
            <IconWrapper>
              <img src={SearchIcon} alt="search"></img>
              <img src={NoticeIcon} alt="notice"></img>
              {getCookie("loginToken") ? (
                <>
                  <p>
                    {getCookie("email")}&#40;{userRole}&#41;님, 안녕하세요
                  </p>
                  <img src={ProfileIcon} alt="profile" onClick={handleLogout}></img>
                  <p onClick={handleLogout}>Logout</p>
                </>
              ) : (
                <a href="/login" rel="noopener noreferrer">
                  Login
                </a>
              )}
            </IconWrapper>
          </StyledHeader>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              borderRadius: 5,
              boxShadow: "0px 0px 10px -5px gray",
            }}
          >
            {/* <BrowserRouter> */}
            <Routes>
              <Route path="/" element={<Home />} />
              {/* 사용부서 */}
              <Route
                path="/createPr"
                element={
                  <PrivateRoute role1="ROLE_USER" role2="" role3="">
                    <CreatePr />
                  </PrivateRoute>
                }
              />
              <Route
                path="/createPr/:id"
                element={
                  <PrivateRoute role1="ROLE_USER" role2="" role3="">
                    <CreatePr />
                  </PrivateRoute>
                }
              />
              <Route
                path="/selectPrList"
                element={
                  <PrivateRoute role1="ROLE_BUYER" role2="ROLE_USER" role3="">
                    <SelectPrList />
                  </PrivateRoute>
                }
              />
              {/* 바이어 */}
              <Route
                path="/rfqCreate"
                element={
                  <PrivateRoute role1="ROLE_BUYER" role2="" role3="">
                    <RfqCreate />
                  </PrivateRoute>
                }
              />
              <Route
                path="/rfqCreate/:rfq_no"
                element={
                  <PrivateRoute role1="ROLE_BUYER" role2="" role3="">
                    <RfqCreate />
                  </PrivateRoute>
                }
              />
              <Route
                path="/selectRFQList"
                element={
                  <PrivateRoute role1="ROLE_BUYER" role2="" role3="">
                    <SelectRFQList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/selectRFQList/:id"
                element={
                  <PrivateRoute role1="ROLE_BUYER" role2="" role3="">
                    <RfqDetail />
                  </PrivateRoute>
                }
              />

              <Route
                path="/successBid/:bidding_no"
                element={
                  <PrivateRoute role1="ROLE_BUYER" role2="" role3="">
                    <SuccessBid />
                  </PrivateRoute>
                }
              />

              <Route
                path="/selectPoList"
                element={
                  <PrivateRoute role1="ROLE_BUYER" role2="" role3="">
                    <SelectPoList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/poRegist"
                element={
                  <PrivateRoute role1="ROLE_BUYER" role2="" role3="">
                    <PoRegist />
                  </PrivateRoute>
                }
              />
              <Route
                path="/poRegist/:id"
                element={
                  <PrivateRoute role1="ROLE_BUYER" role2="" role3="">
                    <PoRegist />
                  </PrivateRoute>
                }
              />

              {/* 공급사 */}
              <Route
                path="/bidWrite/:id"
                element={
                  <PrivateRoute role1="ROLE_VENDOR" role2="" role3="">
                    <BidWrite />
                  </PrivateRoute>
                }
              />

              {/* 공통 */}
              <Route
                path="/bidList"
                element={
                  <PrivateRoute role1="ROLE_VENDOR" role2="ROLE_BUYER" role3="ROLE_USER">
                    <SelectBidList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/bidList/:id"
                element={
                  <PrivateRoute role1="ROLE_VENDOR" role2="ROLE_BUYER" role3="ROLE_USER">
                    <BidDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute role1="ROLE_VENDOR" role2="ROLE_BUYER" role3="ROLE_USER">
                    <DashBoard />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />

              <Route path="/*" element={<p>Page Not Found</p>} />
            </Routes>
            {/* </BrowserRouter> */}
          </Content>
        </Layout>
      </StyledRoot>
    </>
  );
}

export default App;

const StyledRoot = styled(Layout)`
  height: 100%;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  img {
    width: 2rem;
    height: 2rem;
    z-index: 5;
    margin-right: 2rem;
    transition: all 0.2s linear;
    :hover {
      cursor: pointer;
      transform: scale(1.4);
    }
  }
  a {
    display: flex;
    align-items: center;
    margin-right: 2rem;
    font-size: 1.6rem;
    color: #666565;
    font-family: "Pretendard-Bold";
    :hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
  p:nth-of-type(1) {
    margin-right: 2rem;
    font-size: 1.6rem;
    color: #666565;
    font-family: "Pretendard-SemiBold";
  }
  p:nth-of-type(2) {
    margin-right: 2rem;
    font-size: 1.6rem;
    color: #666565;
    font-family: "Pretendard-Bold";
    :hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
`;

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
