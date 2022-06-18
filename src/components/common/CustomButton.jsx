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

export const DeleteButton = styled.button`
  width: 8rem;
  height: 3rem;
  background-color: ${colors.mildBlack};
  color: white;
  font-size: 1.4rem;
  font-family: "Pretendard-Regular";
  border-radius: 0.5rem;
  :hover {
    cursor: pointer;
    background-color: ${colors.subBlack};
  }
  margin-left: 1rem;
  // margin-bottom: 1rem;
`;