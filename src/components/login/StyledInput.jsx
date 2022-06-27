import { ErrorIcon } from "assets/images";
import { colors } from "assets/styles/color";
import React, { useState } from "react";
import Styled, { css } from "styled-components";
import { ifProp, palette, theme } from "styled-tools";

function StyledInput({
  placeHolder,
  width,
  height,
  margin,
  onChange,
  isConditionMet,
  errorMsg,
  onKeyUp,
  isPw,
  readOnly = false,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const handleOnChange = (e) => {
    onChange?.(e.target.value);
    setValue(e.target.value);
  };

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  return (
    <SStyledInput margin={margin}>
      <InputContainer
        width={width}
        height={height}
        condition={!isFocused ? -1 : (isFocused && isConditionMet) || value == "" ? 1 : 0}
        readOnly={readOnly}
      >
        <Input
          placeholder={placeHolder}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          type={isPw ? "password" : "text"}
          readOnly={readOnly}
          autoComplete={isPw ? "false" : "true"}
          onKeyUp={onKeyUp}
        />
        {isFocused && !isConditionMet && value !== "" && (
          <ErrorImage>
            <Icon src={ErrorIcon} size={24} />
          </ErrorImage>
        )}
      </InputContainer>
      {isFocused && !isConditionMet && value !== "" && <ErrorMsg>{errorMsg}</ErrorMsg>}
    </SStyledInput>
  );
}

export default StyledInput;

const Input = Styled.input`
  border: none;
  color: ${ifProp({ readOnly: true }, "#8b8b8b", "#0d0d0d")};
  background: ${ifProp("readOnly", "#dfdfdf")}; 
  width: 100%;
  height: 100%;
  padding: 18px 20px;
  border-radius: 4px;
  font-size: 1.4rem;

  :focus{
    outline: none;
  }
  :placeholder{
    color: '#c1c1c1';
  }
  transition: background-color 600000s 0s, color 600000s 0s;
`;

const InputContainer = Styled.div`
  /* condition 
    -1 : 기본
    0 : 컨디션 X
    1 : 컨디션 O   */
  ${(props) =>
    props.readOnly
      ? css`
          border: solid 1px #c1c1c1;
        `
      : props.condition === -1
      ? css`
          border: solid 1px #c1c1c1;
        `
      : props.condition === 1
      ? css`
          border: double 1px transparent;
          background: linear-gradient(white, white),
            linear-gradient(to right, #005386, ${colors.themeBlue3});
          background-origin: border-box;
          background-clip: content-box, border-box;
        `
      : css`
          border: solid 1px "#f66436";
        `};
  border-radius : 4px;   
  display : flex;    
  align-items : center;  
  width : ${(props) => props.width};
  height : ${(props) => props.height};
  margin-bottom : 5px;
`;

const ErrorImage = Styled.div`
  width : 24px;
  height : 24px;
  margin-right : 15px;
`;

const ErrorMsg = Styled.div`
  text-align : left;
  text-align: left;
  color: '#f66436';
`;

const SStyledInput = Styled.div`
  display : flex;
  flex-direction : column;
  margin : ${(props) => props.margin};
`;
