import { getPoList, getPoLov } from "apis/po.api";
import Input from "components/common/Input";
import InputSearch from "components/common/InputSearch";
import InputSelect from "components/common/InputSelect";
import React, { useEffect, useState } from "react";

function SelectPoList() {
  const [poCondition, setPoCondition] = useState({
    contractName: "",
    suplier: "",
    poGroup: "",
    poNum: "",
    item: "",
    prNum: "",
    rfqNum: "",
    prRequestor: "",
    buyer: "",
  });
  const [poGroupLov, setPoGroupLov] = useState([]);
  const [poApprove, setPoApprove] = useState([]);
  const [saso, setSaso] = useState([]);
  const [poType, setPoType] = useState([]);

  const handlePoCondition = (key, value) => {
    console.log(key);
    const tempPoCondition = { ...poCondition };

    tempPoCondition[key] = value;
    setPoCondition(tempPoCondition);
  };
  const selectPoList = async () => {
    const poListData = await getPoList();

    console.log(poListData);
    console.log(poCondition);
  };
  const getLov = async () => {
    const data = await getPoLov();

    data && setPoGroupLov(data);
  };

  useEffect(() => {
    getLov();
    console.log(poGroupLov);
  }, []);

  return (
    <section>
      <div>
        <button onClick={selectPoList}>조회</button>
      </div>
      <div>
        <Input
          id="contractName"
          inputLabel="계약명"
          handlePoCondition={handlePoCondition}
          inputValue={poCondition.contractName}
        />
        <InputSearch
          id="suplier"
          inputLabel="공급사"
          handlePoCondition={handlePoCondition}
          inputValue={poCondition.suplier}
        />
        <InputSelect
          id="poGroup"
          inputLabel="계약구분"
          handlePoCondition={handlePoCondition}
          inputValue={poCondition.poGroup}
          lov={poGroupLov}
        />
        {/* <InputSelect id="poApprove" inputLabel="PO 승인" />*/}
        <Input
          id="poNum"
          inputLabel="PO 번호"
          handlePoCondition={handlePoCondition}
          inputValue={poCondition.poNum}
        />
        <InputSearch
          id="item"
          inputLabel="Item"
          handlePoCondition={handlePoCondition}
          inputValue={poCondition.item}
        />
        <Input
          id="prNum"
          inputLabel="PR 번호"
          handlePoCondition={handlePoCondition}
          inputValue={poCondition.prNum}
        />
        <Input
          id="rfqNum"
          inputLabel="RFQ번호"
          handlePoCondition={handlePoCondition}
          inputValue={poCondition.rfqNum}
        />
        {/* <InputSelect id="saso" inputLabel="사소" /> */}
        <InputSearch
          id="prRequestor"
          inputLabel="PR 신청자"
          handlePoCondition={handlePoCondition}
          inputValue={poCondition.prRequestor}
        />
        <InputSearch
          id="buyer"
          inputLabel="Buyer"
          handlePoCondition={handlePoCondition}
          inputValue={poCondition.buyer}
        />
        {/* <InputSelect id="poType" inputLabel="Type" /> */}
      </div>
    </section>
  );
}

export default SelectPoList;
