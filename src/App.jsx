import "assets/fonts/font.css";
import "antd/dist/antd.min.css";
import "App.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { GlobalStyle } from "assets/styles/GlobalStyles";
import Home from "pages/Home";
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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import BidWrite from "pages/BidWrite";

function App() {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const item1 = [
    {
      type: 'group',
      label: '구매신청',
      children: [
        {
          label: (
            <a href="/createPr" rel="noopener noreferrer">
              구매신청등록
            </a>
          ),
          key: 'setting:1',
        },
        {
          label: (
            <a href="/selectPrList" rel="noopener noreferrer">
              구매신청조회
            </a>
          ),
          key: 'setting:2',
        },
      ],
    },
    {
      type: 'group',
      label: 'RFQ',
      children: [
        {
          label: (
            <a href="/selectRFQList" rel="noopener noreferrer">
              RFQ조회
            </a>
          ),
          key: 'setting:3',
        },
      ],
    },
    {
      type: 'group',
      label: '입찰',
      children: [
        {
          label: (
            <a href="/bidList" rel="noopener noreferrer">
              입찰진행현황조회
            </a>
          ),
          key: 'setting:4',
        },
      ],
    },
    {
      type: 'group',
      label: '구매계약',
      children: [
        {
          label: (
            <a href="/poRegist" rel="noopener noreferrer">
              구매계약등록
            </a>
          ),
          key: 'setting:5',
        },
        {
          label: (
            <a href="/selectPoList" rel="noopener noreferrer">
              구매계약조회
            </a>
          ),
          key: 'setting:6',
        },
      ],
    },
  ]

  const item2 = [
    {
      label: '구매신청',
      key: 'PrSubMenu',
      // icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: (
            <a href="/createPr" rel="noopener noreferrer">
              구매신청등록
            </a>
          ),
        },
        {
          type: 'group',
          label: (
            <a href="/selectPrList" rel="noopener noreferrer">
              구매신청조회
            </a>
          ),
        },
      ],
    },
    {
      label: 'RFQ',
      key: 'RfqSubMenu',
      // icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: (
            <a href="/selectRFQList" rel="noopener noreferrer">
              RFQ조회
            </a>
          ),
        },
      ],
    },
    {
      label: '입찰',
      key: 'BidSubMenu',
      // icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: (
            <a href="/bidList" rel="noopener noreferrer">
              입찰진행현황조회
            </a>
          ),
        },
      ],
    },
    {
      label: '구매계약',
      key: 'PoSubMenu',
      // icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: (
            <a href="/poRegist" rel="noopener noreferrer">
              구매계약등록
            </a>
          ),
        },
        {
          type: 'group',
          label: (
            <a href="/selectPoList" rel="noopener noreferrer">
              구매계약조회
            </a>
          ),
        },
      ],
    },
  ]

  return (
    <>
      <GlobalStyle />
      <StyledRoot>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={item2}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/selectPoList" element={<SelectPoList />} />
                <Route path="/poRegist" element={<PoRegist />} />
                <Route path="/poRegist/:id" element={<PoRegist />} />
                <Route path="/successBid" element={<SuccessBid />} />
                <Route path="/selectPrList" element={<SelectPrList />} />
                <Route path="/createPr" element={<CreatePr />} />
                <Route path="/createPr/:id" element={<CreatePr />} />
                <Route path="/selectRFQList" element={<SelectRFQList />} />
                <Route path="/selectRFQList/:id" element={<RfqDetail />} />
                <Route path="/bidList" element={<SelectBidList />} />
                <Route path="/bidList/:id" element={<BidDetail />} />
                <Route path="/bidWrite/:id" element={<BidWrite />} />
                <Route path="/rfqCreate" element={<RfqCreate />} />
                <Route path="/*" element={<p>Page Not Found</p>} />
              </Routes>
            </BrowserRouter>
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
