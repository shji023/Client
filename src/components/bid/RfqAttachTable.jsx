import { colors } from "assets/styles/color";
import React from "react";
import styled from "styled-components";
const mockData = [
  {
    id: "1",
    type: "구입사양서",
    attach: "ㅎㅎ.pdf",
    attachName: "이거는 첨부파일명 엄청 긴 첨부파일명",
    size: "164kb",
    registerDate: "2022-06-13",
  },
  {
    id: "2",
    type: "구입사양서",
    attach: "qq.pdf",
    attachName: "초콜릿",
    size: "164kb",
    registerDate: "2022-06-13",
  },
  {
    id: "3",
    type: "구입사양서",
    attach: "ㅎㅎ.pdf",
    attachName: "뀨",
    size: "164kb",
    registerDate: "2022-06-13 14:00 (GMT +9:00)",
  },
  {
    id: "4",
    type: "구입사양서",
    attach: "qq.pdf",
    attachName: "브",
    size: "164kb",
    registerDate: "2022-06-13",
  },
];
function RfqAttachTable() {
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
        {mockData ? (
          mockData.map((m) => (
            <Tr key={m.id}>
              <Td>{m.type}</Td>
              <Td>{m.attach}</Td>
              <Td>{m.attachName}</Td>
              <Td>{m.size}</Td>
              <Td>{m.registerDate}</Td>
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

export default RfqAttachTable;

const Table = styled.table`
  width: 100%;
  border: 1px solid rgb(225 225 225 / 87%);
  border-collapse: collapse;
  font-size: 1.6rem;
  table-layout: auto;
`;

const Th = styled.th`
  border: 1px solid rgb(225 225 225 / 87%);
  padding: 1rem;
  background-color: ${colors.tableBlue};
  font-family: "Pretendard-SemiBold";
`;

const Tr = styled.tr`
  border: 1px solid rgb(225 225 225 / 87%);
`;

const Td = styled.td`
  border: 1px solid rgb(225 225 225 / 87%);
  text-align: center;
  padding: 1rem;
`;
