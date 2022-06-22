import { colors } from "assets/styles/color";
import { UploadButton } from "components/common/CustomButton";
import React, { useRef } from "react";
import styled from "styled-components";
import QuotationSelect from "./QuotationSelect";

function QuotationSubmitTable({
  quotationFile,
  handleRemoveList,
  handleFileContent,
  handleInputChange,
}) {
  const lov = ["기타"];
  const inputRef = useRef(null);
  const handleButton = () => {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  };
  return (
    <Table>
      <thead>
        <Tr>
          <Th>선택</Th>
          <Th>유형</Th>
          <Th>첨부</Th>
          <Th>첨부파일명</Th>
          <Th>Size</Th>
          <Th>등록일</Th>
        </Tr>
      </thead>
      <tbody>
        {quotationFile ? (
          quotationFile.map((q) => (
            <Tr key={q.id}>
              <Td>
                <input
                  type="checkbox"
                  onChange={(e) => handleRemoveList(e.currentTarget.checked, q.id)}
                />
              </Td>
              <Td>
                <QuotationSelect
                  id="type"
                  handleFileContent={handleFileContent}
                  lov={lov}
                  isDisabled={false}
                ></QuotationSelect>
              </Td>
              <Td>
                <input
                  hidden={true}
                  ref={(el) => {
                    inputRef.current = el;
                  }}
                  type="file"
                  onChange={handleInputChange}
                />
                <UploadButton onClick={handleButton}>업로드</UploadButton>
              </Td>
              <Td>{q.origin_name}</Td>
              <Td>{q.size}</Td>
              <Td>{q.upload_date}</Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td>조회된 건이 없습니다.</Td>
          </Tr>
        )}
      </tbody>
    </Table>
  );
}

export default QuotationSubmitTable;

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
