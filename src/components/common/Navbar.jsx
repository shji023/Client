// import { Ping } from "../../assets/images";
import { colors } from "assets/styles/color";
import React from "react";
import styled from "styled-components";
function Navbar() {
  return (
    <StyledRoot>
      <NavTitle>이알피 베이비 화이팅</NavTitle>
      {/* <img src={Ping} alt="pinguIcon"></img> */}
    </StyledRoot>
  );
}

export default Navbar;

export const StyledRoot = styled.div`
  width: 100%;
  height: 10rem;
  background-color: ${colors.mainBlue};
`;
export const NavTitle = styled.p`
  color: white;
  font-size: 3rem;
  font-family: "Pretendard-Regular";
`;
