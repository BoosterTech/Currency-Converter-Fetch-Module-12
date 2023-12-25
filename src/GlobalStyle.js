import { createGlobalStyle } from "styled-components";
import background from "./background.png";

export const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
}

*,
::before,
::after {
  box-sizing: inherit;
}

body{
  margin: 0;
}

#root {

  display: flex;
  align-items: center;
  justify-content: center;
  background-image:url("${background}");
  background-position: center;
  background-size: cover; 
  min-height: 100vh; 
}`