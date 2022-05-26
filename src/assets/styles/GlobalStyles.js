import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
    height: 100%;
  }
  body{
    font-family: "Pretendard-Regular", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    height: 100%;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    background-color: transparent;
    border: none;
    // outline: none;
  }
  h1, h2, h3, h4, h5, h6{
    font-family:'Maven Pro', sans-serif;
  }
  *::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  // scrollbar 막대
  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgb(225 225 225 / 87%);
  }
  // scrollbar 빈칸
  *::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }
`;
