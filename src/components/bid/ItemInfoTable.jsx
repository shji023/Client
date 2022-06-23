import { colors } from "assets/styles/color";
import React from "react";
import styled from "styled-components";

function ItemInfoTable({ itemInfoList }) {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Line</Th>
          <Th>그룹사명</Th>
          <Th>Category</Th>
          <Th>사양</Th>
          <Th>UOM</Th>
          <Th>Quantity</Th>
          <Th>Need By Date</Th>
          <Th>신청자</Th>
        </Tr>
      </thead>
      <tbody>
        {itemInfoList.length !== 0 ? (
          itemInfoList.map((itemInfo, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{itemInfo.group_name}</Td>
              <Td>{itemInfo.category}</Td>
              <Td>{itemInfo.description}</Td>
              <Td>{itemInfo.unit_meas_lookup_code}</Td>
              <Td>{itemInfo.pur_rfq_qt}</Td>
              <Td>{itemInfo.need_by_date}</Td>
              <Td>{itemInfo.request_name}</Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td8>조회된 건이 없습니다.</Td8>
          </Tr>
        )}
      </tbody>
    </Table>
  );
}

export default ItemInfoTable;

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
  max-width: 45rem;
  height: 3.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Td8 = styled.td.attrs({
  colSpan: 8,
})`
  border: 1px solid ${colors.tableLineGray};
  text-align: center;
  padding: 1rem;
`;
