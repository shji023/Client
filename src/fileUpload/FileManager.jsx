import { colors } from "assets/styles/color";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BidInputSelect from "components/bid/BidInputSelect";
import { uploadContent, uploadFiles, getStatusLov1 } from "apis/file.api";

function FileManager({sendFile}) {
  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState(sendFile);
  const [stateTypeLov, setStateTypeLov] = useState([]);
  const [fileInfoList, setFileInfoList] = useState([]);

  const getLov = () => {
    const stateTypeLov = getStatusLov1();
    stateTypeLov && setStateTypeLov(stateTypeLov);
  };

  const handleCondition = (key, value) => {
    const tempBidCondition = { ...content };
    tempBidCondition[key] = value;
    setContent(tempBidCondition);
  };


  // 파일을 서버에 저장
  const handleInputChange = async (e) => {
    // formData : 파일을 담는 객체
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const fileInfo = await uploadFiles(formData);
    setFileInfoList(fileInfo[0]);
    console.log("fileInfoList : ", fileInfoList);

    setTimeout(()=>{}, 1000);
    
  };

  // 파일을 DB에 저장
  const saveDB = async () => {
    const DBInfo = uploadContent(fileInfo[0], content);
  }

  useEffect(() => {
    getLov(); 
  }, []);

  return (
    <>
      <ButtonWrapper>
        <SubTitle>RFQ 첨부1 (공급사 배포)</SubTitle>
      </ButtonWrapper>
      <section>
        <UploadContainer>
          <Label htmlFor="check">선택</Label>
          <Label htmlFor="type">유형</Label>
          <Label htmlFor="file">첨부</Label>
          <Label htmlFor="title">첨부 파일명</Label>
          <Label htmlFor="size">Size</Label>
          <Label htmlFor="createDate">등록일</Label>
          <p>체크박스 표시</p>
          <BidInputSelect
              id="type"
              inputLabel="입찰유형"
              handleCondition={handleCondition}
              lov={stateTypeLov}
            />
          <InputFile
            type="file"
            name="file"
            id="file"
            placeholder="Select a file for upload"
            onChange={handleInputChange}
            valid={true}
          />
          <p>{fileInfoList.originFile}</p>
          <p>{fileInfoList.size} Byte</p>
          <p>{fileInfoList.uploadDate}</p>
        </UploadContainer>
      </section>
    </>
  );
}

export default FileManager;

const StyledRoot = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 2rem 2rem 2rem 0.5rem;
  gap: 1rem;
`;

const UploadContainer = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 0.5fr 1fr 1.5fr 0.5fr 0.5fr;
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 0rem 0.5rem;
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
  margin-bottom: 1rem;
  // margin-top: 1.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubTitle = styled.p`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  width: 90%;
  height: 100%;
`;

const Label = styled.label`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  width: 90%;
  height: 100%;
`;

const InputFile = styled.input`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  // margin-top: 1rem;
  width: 90%;
  height: 100%;
`;
