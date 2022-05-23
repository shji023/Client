import React from "react";

function Input({ id, inputLabel, handlePoCondition, inputValue }) {
  return (
    <div>
      <label htmlFor={id}>{inputLabel}</label>
      <input 
        type="text" 
        id={id} 
        value={inputValue} 
        onChange={(e) => handlePoCondition(id, e.target.value)}/>
    </div>
  );
}

export default Input;
