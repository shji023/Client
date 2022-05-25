import React from "react";

function Input({ id, inputLabel, handlePoCondition, lov }) {
  return (
    <div>
      <label htmlFor={id}>{inputLabel}</label>
      <select id={id} onChange={(e) => handlePoCondition(id, e.target.value)}>
      <option value="">선택</option>
        {lov.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Input;
