import { getBidList, getCategoryLov, getStatusLov } from "apis/bid.api";
import { colors } from "assets/styles/color";
import BidDataGrid from "components/bidding/BidDataGrid";
import BidInputInfo from "components/bidding/BidInputInfo";
import BidInputSelect from "components/bidding/BidInputSelect";
import InputDate from "components/common/InputDate";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
function BidDetail() {
  const { id } = useParams();
  return (
    <StyledRoot>
      <Title>입찰정보조회 {id}</Title>
    </StyledRoot>
  );
}

export default BidDetail;

const StyledRoot = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 2rem 0.5rem;
  gap: 1rem;
`;

const Button = styled.button`
  width: 10rem;
  height: 4rem;
  background-color: ${colors.mainBlue};
  color: white;
  font-size: 1.6rem;
  font-family: "Pretendard-Regular";
  border-radius: 0.7rem;
  :hover {
    cursor: pointer;
  }
  margin-bottom: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.p`
  font-size: 2.4rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;

