import React from "react";
import { Alert } from "assets/images";
import styled from "styled-components";
import { colors } from "assets/styles/color";
function ConfirmModal({ isModalOpen, setIsModalOpen, postVendorInfo }) {
  const handleClose = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };
  const handleConfirm = () => {
    postVendorInfo();
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };
  return isModalOpen ? (
    <>
      <BackGround isBlur={true} onClick={handleClose}></BackGround>
      <ModalWrapper>
        <Notice>
          <NoticeIcon>
            <img src={Alert} alt="confirmAlert"></img>
          </NoticeIcon>
          <NoticeDetail>승인요청 하시겠습니까?</NoticeDetail>
        </Notice>
        <ButtonContainer>
          <CancelButton onClick={handleClose}>취소</CancelButton>
          <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
        </ButtonContainer>
      </ModalWrapper>
    </>
  ) : (
    <></>
  );
}

export default ConfirmModal;

const Notice = styled.div`
  padding: 0px 80px 0px 80px;
`;

const NoticeIcon = styled.div`
  display: flex;
  margin: auto;
  margin-left: 12rem;
  margin-top: -4rem;
`;

const NoticeDetail = styled.div`
  text-align: center;
  color: "#0d0d0d";
  font-size: 3rem;
  font-family: "Pretendard-Bold";
  margin-top: 6rem;
`;

const ButtonContainer = styled.div`
  padding: 5rem 10rem 0 10rem;
  text-align: center;
  justify-content: space-between;
  display: flex;
  margin-top: 2rem;
`;

const CancelButton = styled.button`
  font-family: "Pretendard-SemiBold";
  color: "#464646";
  font-size: 2rem;
  :hover {
    cursor: pointer;
  }
`;

const ConfirmButton = styled.button`
  font-family: "Pretendard-SemiBold";
  color: ${colors.mainBlue};
  font-size: 2rem;
  :hover {
    cursor: pointer;
  }
`;

const ModalWrapper = styled.div`
  z-index: 151;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  border-radius: 1.6rem;
  border: solid 1px #8b8b8b;
  background-color: white;
  width: 50rem;
  height: 31.2rem;
`;

export const BackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  max-height: 100%;
  opacity: ${(props) => (props.isBlur ? 0.7 : undefined)};
  background-color: ${(props) => (props.isBlur ? "rgba(0,0,0,0.7)" : undefined)};
  z-index: 150;
`;
