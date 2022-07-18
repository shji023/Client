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

export const UploadButton = styled.button`
  width: 10rem;
  height: 3rem;
  background-color: ${colors.mainBlue};
  color: white;
  font-size: 1.4rem;
  font-family: "Pretendard-Regular";
  border-radius: 0.5rem;
  :hover {
    cursor: pointer;
    background-color: ${colors.mildBlack};
  }
  margin-left: 1rem;
  // margin-bottom: 1rem;
  :disabled {
    background-color: ${colors.mildBlack};
  }
`;

export const GetDataButton = styled.button`
  width: 10rem;
  height: 4rem;
  background-color: white;
  color: ${colors.mainBlue};
  font-size: 1.6rem;
  font-family: "Pretendard-Regular";
  border-radius: 0.5rem;
  border: 2px solid ${colors.mainBlue};
  :hover {
    cursor: pointer;
    background-color: ${colors.mainBlue};
    color: white;
  }
  margin-left: 1rem;
  // margin-bottom: 1rem;
`;
