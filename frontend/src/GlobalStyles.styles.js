import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
   }
 
  body{
    height: 100vh;
    width: 100vw;
  }
`;
//TODO: change the theme below
export const theme = {
    bgPrimary: "linear-gradient(to right, #6f00c0, #4868cb);",
    bgSecondary: "#302b63",
    text: "#ffff",
};