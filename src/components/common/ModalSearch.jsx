import { Input, Button, Modal } from "antd";
import { getSearchBuyerList } from "apis/buyer.api";
import React, { useEffect, useState }  from "react";
import styled from "styled-components";
import DataGridModal from "./DataGridModal";


function ModalSearch({ id, inputLabel, handlePoCondition, inputValue }) {

  console.log("### inputValue2 ", inputValue);

  // const [searchData, setSearchData] = useState([]);

  // const inputSearch = async () => {
  //   const data = await getSearchBuyerList(inputValue);
  //   console.log("data : !!!!!",  data);

  //   setSearchData(data);
  // };
  
  return (
    <>
      <StyledRoot>
        <Label htmlFor={id}>{inputLabel}</Label>
        <Input
        type="text"
        id={id}
        value={inputValue}
        onChange={(e) => handlePoCondition(id, e.target.value)}
        style={{ width: 200 }}
        />
        {/* <Button onClick={inputSearch}>검색</Button>
        <section>
          <br/>
          <DataGridModal poListData={searchData} />
        </section> */}
      </StyledRoot>
      
      </>
  );
}

export default ModalSearch;

const StyledRoot = styled.div`
  display: row;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1.6rem;
  width: 8rem;
  text-align: center;
`;