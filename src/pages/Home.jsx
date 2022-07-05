import DashBoardGraph from "components/DashBoardGraph";
import DashBoardLine from "components/DashBoardLine";
import DashBoardProcess from "components/DashBoardProcess";

import React from "react";

function Home() {
  return (
    <div>
      여기는 홈페이지
      <DashBoardLine></DashBoardLine>
      <DashBoardGraph></DashBoardGraph>
      {/* <DashBoardProcess></DashBoardProcess> */}
    </div>
  );
}

export default Home;
