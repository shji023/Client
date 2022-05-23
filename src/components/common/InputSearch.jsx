import React from "react";

function InputSearch({ id, inputLabel, handlePoCondition, inputValue }) {
  return (
    <div>
      <label htmlFor={id}>{inputLabel}</label>
      <input 
        type="text" 
        id={id} 
        value={inputValue} 
        onChange={(e) => handlePoCondition(id, e.target.value)}/>
        <button>찾기</button>
    </div>
  );
}

export default InputSearch;
