import "assets/fonts/font.css";
import "antd/dist/antd.min.css";

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
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

function App() {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);

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
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "구매신청등록",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "구매신청조회",
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "RFQ조회",
              },
              {
                key: "4",
                icon: <UploadOutlined />,
                label: "입찰진행현황조회",
              },
              {
                key: "5",
                icon: <UploadOutlined />,
                label: "구메계약대상조회",
              },
            ]}
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
