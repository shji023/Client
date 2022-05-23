import React from "react";

function Input({ id, inputLabel, handlePoCondition, inputValue, lov }) {
  return (
    <div>
      <label htmlFor={id}>{inputLabel}</label>
      <select id={id} onChange={(e) => handlePoCondition(id, e.target.value)}>
        {lov.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Input;
