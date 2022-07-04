import { downloadFile } from "apis/file.api";
import { colors } from "assets/styles/color";
import { UploadButton } from "components/common/CustomButton";
import React from "react";
import styled from "styled-components";

function RfqAttachTable({ vendorFileList }) {
  console.log(vendorFileList);
  
  const handleButton = async (file_id) => {
    await downloadFile(file_id);
  };

  return (
    <Table>
      <thead>
        <Tr>
          <Th>유형</Th>
          <Th>첨부</Th>
          <Th>첨부파일명</Th>
          <Th>Size</Th>
          <Th>등록일</Th>
        </Tr>
      </thead>
      <tbody>
        {vendorFileList.length !== 0 ? (
          vendorFileList.map((v, index) => (
            <Tr key={index}>
              <Td>{v.type}</Td>
              <Td>
                <UploadButton onClick={()=>{handleButton(v.file_id)}}>다운로드</UploadButton>
              </Td>
              <Td>{v.origin_name}</Td>
              <Td>{v.size}</Td>
              <Td>{v.upload_date}</Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td5>조회된 건이 없습니다.</Td5>
          </Tr>
        )}
      </tbody>
    </Table>
  );
}

export default RfqAttachTable;

const Table = styled.table`
  width: 100%;
  border: 1px solid ${colors.tableLineGray};
  border-collapse: collapse;
  font-size: 1.4rem;
  table-layout: auto;
`;

const Th = styled.th`
  border: 1px solid ${colors.tableLineGray};
  padding: 1rem;
  background-color: ${colors.tableBlue};
  font-family: "Pretendard-SemiBold";
`;

const Tr = styled.tr`
  border: 1px solid ${colors.tableLineGray};
`;

const Td = styled.td`
  border: 1px solid ${colors.tableLineGray};
  text-align: center;
  padding: 1rem;
`;

const Td5 = styled.td.attrs({
  colSpan: 5,
})`
  border: 1px solid ${colors.tableLineGray};
  text-align: center;
  padding: 1rem;
`;
