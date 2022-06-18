import { colors } from "assets/styles/color";
import styled from "styled-components";

export const Button = styled.button`
  width: 10rem;
  height: 4rem;
  background-color: ${colors.mainBlue};
  color: white;
  font-size: 1.6rem;
  font-family: "Pretendard-Regular";
  border-radius: 0.5rem;
  :hover {
    cursor: pointer;
    background-color: ${colors.subBlue};
  }
  margin-left: 1rem;
  // margin-bottom: 1rem;
`;