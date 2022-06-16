import { colors } from "assets/styles/color";
import React from "react";
import styled from "styled-components";
const mockData = [
  {
    line: "1",
    groupName: "Posco",
    category: "Q-Dummy Bar",
    description: "Circuit Breaker ELCB,[EBN103C/LS] OR[HGE100E/HYUNDAI ELECTRIC],AC 220/460V,100A,18kA,3P,100AF,30mA,100/200/500MA",
    uom: "set",
    quantity: "1",
    needByDate: "2022-06-13",
    requestPerson: "손영일",
  },
  {
    line: "2",
    groupName: "Posco",
    category: "Q-Dummy Bar",
    description: "Circuit Breaker ELCB,[EBN103C/LS] OR[HGE100E/HYUNDAI ELECTRIC],AC 220/460V,100A,18kA,3P,100AF,30mA,100/200/500MA",
    uom: "set",
    quantity: "1",
    needByDate: "2022-06-13",
    requestPerson: "손영일",
  },
  {
    line: "3",
    groupName: "Posco",
    category: "Q-Dummy Bar",
    description: "Circuit Breaker ELCB,[EBN103C/LS] OR[HGE100E/HYUNDAI ELECTRIC],AC 220/460V,100A,18kA,3P,100AF,30mA,100/200/500MA",
    uom: "set",
    quantity: "1",
    needByDate: "2022-06-13",
    requestPerson: "손영일",
  },
  {
    line: "4",
    groupName: "Posco",
    category: "Q-Dummy Bar",
    description: "Circuit Breaker ELCB,[EBN103C/LS] OR[HGE100E/HYUNDAI ELECTRIC],AC 220/460V,100A,18kA,3P,100AF,30mA,100/200/500MA",
    uom: "set",
    quantity: "1",
    needByDate: "2022-06-13",
    requestPerson: "손영일",
  },
];
function ItemInfoTable({itemInfoList}) {
  console.log(itemInfoList);
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
        {itemInfoList ? (
          itemInfoList.map((itemInfo,index) => (
            <Tr key={itemInfo.id}>
              <Td>{index+1}</Td>
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
            <Td>조회된 건이 없습니다.</Td>
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
  font-size: 1.6rem;
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