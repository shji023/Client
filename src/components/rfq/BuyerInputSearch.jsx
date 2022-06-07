import { Input, Button, Modal } from "antd";
import React, { useEffect, useState }  from "react";
import styled from "styled-components";
import ModalSearch from "components/common/ModalSearch";
import DataGridModal from "components/common/DataGridModal";
import { getSearchBuyerList } from "apis/buyer.api";
import {setRfqCondition} from "pages/SelectRFQList"
function InputSearch({ id, inputLabel, handlePoCondition, inputValue, setInputValue }) {

 
  const [modalListData, setModalListData] = useState([]);

  const handleInputValue = (key, value) => {

    const tempInputValue = { ...inputValue };
    tempInputValue[key] = value;
    setInputValue(tempInputValue);
  };
  
  const SelectSearch = async () => {
    const data = await getSearchBuyerList(inputValue);
    // console.log("data : !!!!!",  data);

    setSearchData(data);
  };
  const [searchData, setSearchData] = useState([]);

  // modal
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
    
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <>
     <Modal
        title="Buyer 선택"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        
        {/* modal 창 안의 내용> */}
        {/* <p>{modalText}</p> */}
        <ModalSearch
          id="BUYER_ID"
          inputLabel="Buyer"
          handlePoCondition={handleInputValue}
          inputValue={inputValue.BUYER_ID}
        />
        <br/>
        <Button onClick={SelectSearch}>검색</Button>
        <section>
          <br/>
          <DataGridModal poListData={searchData} />
        </section>
      </Modal>

      {/* 화면에 보여지는 코드 */}
      <StyledRoot>
        <Label htmlFor={id}>{inputLabel}</Label>
        <Input.Search
          allowClear
          type="text"
          id={id}
          // value={inputValue.BUYER_ID}
          onChange={(e) => handlePoCondition(id, e.target.value)}
          onSearch = {showModal}  // modal     
          style={{ width: 200 }}
        />
      </StyledRoot>
    </>
  );
}

export default InputSearch;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1.6rem;
  width: 8rem;
  text-align: center;
`;


