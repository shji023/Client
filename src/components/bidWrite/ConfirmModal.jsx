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
          <NoticeDetail>응찰서 작성을 확정하시겠습니까?</NoticeDetail>
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
  display: flex;
  flex-direction: column;
`;

const NoticeIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -3rem;
  img {
    width: 5rem;
    height: 5rem;
  }
`;

const NoticeDetail = styled.div`
  text-align: center;
  color: "#0d0d0d";
  font-size: 2.4rem;
  font-family: "Pretendard-Bold";
  margin-top: 6rem;
`;

const ButtonContainer = styled.div`
  padding: 5rem 0 0 0;
  text-align: center;
  justify-content: space-around;
  display: flex;
  margin-top: 2rem;
`;

const CancelButton = styled.button`
  font-family: "Pretendard-SemiBold";
  color: "#464646";
  font-size: 1.8rem;
  :hover {
    cursor: pointer;
  }
`;

const ConfirmButton = styled.button`
  font-family: "Pretendard-SemiBold";
  color: ${colors.mainBlue};
  font-size: 1.8rem;
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
  width: 40rem;
  height: 25rem;
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
