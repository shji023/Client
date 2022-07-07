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

  isCheckDisabled,
  isSelectDisabled,
  isBtnDisabled,
}) {
  const lov = ["기타"];
  const inputRef = useRef(null);
  const handleButton = (id) => {
    let myInput = document.getElementById("inputFile"+id);
    myInput.click();
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
                <CheckBox
                  type="checkbox"
                  className="ag-input-field-input ag-checkbox-input"
                  disabled={isCheckDisabled}
                  onChange={(e) => handleRemoveList(e.currentTarget.checked, q.id)}
                />
              </Td>
              <Td>
                <QuotationSelect
                  id={q.id}
                  initValue={q.type}
                  handleFileContent={handleFileContent}
                  lov={lov}
                  isDisabled={isSelectDisabled}
                ></QuotationSelect>
              </Td>
              <Td>
                <input
                  id={"inputFile"+q.id}
                  hidden={true}
                  ref={(el) => {
                    inputRef.current = el;
                  }}
                  type="file"
                  onChange={(e) => handleInputChange(e, q.id) }
                />
                <UploadButton onClick={() => {handleButton(q.id)}} disabled={isBtnDisabled}>
                  업로드
                </UploadButton>
              </Td>
              <Td>{q.origin_name}</Td>
              <Td>{q.size}</Td>
              <Td>{q.upload_date}</Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td6>조회된 건이 없습니다.</Td6>
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
  padding: 0.5rem;
`;

const Td6 = styled.td.attrs({
  colSpan: 6,
})`
  border: 1px solid ${colors.tableLineGray};
  text-align: center;
  padding: 0.5rem;
`;

const CheckBox = styled.input`
  width: 16px;
  height: 16px;
`