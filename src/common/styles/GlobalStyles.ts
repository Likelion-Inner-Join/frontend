import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
export const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    font-size:10px;
    height:100vh;
    cursor:default;

  }
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
body {
    font-family: "Pretendard-Regular";
    background-color: #000000;
    height:100vh;
  }
::-webkit-scrollbar {
  width: 4px; /* 스크롤바의 너비 */
  height: 4px; /* 수평 스크롤바의 높이 */
}

/* 스크롤바의 트랙을 스타일링합니다. */
::-webkit-scrollbar-track {
  // background: #CCCAC5; /* 트랙의 배경색 */
  // border-radius: 10px; /* 트랙의 테두리 반경 */
}

/* 스크롤바의 핸들을 스타일링합니다. */
::-webkit-scrollbar-thumb {
  background: #DDDDDD; /* 핸들의 배경색 */
  border-radius: 2px; /* 핸들의 테두리 반경 */
}
  
::-webkit-scrollbar-thumb:hover {
  // background: #6b5b53; /* 핸들의 배경색 (마우스를 올렸을 때) */
}
  input {
   border: none;
    outline: none;  
  }
  button {
    width: auto;
    background: none;
    border: none;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
  a {
    text-decoration: none;
  }
`;
