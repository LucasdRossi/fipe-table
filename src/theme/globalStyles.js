import { createGlobalStyle } from "styled-components";

import background from "../assets/background.jpg";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: url(${background}) center center / cover;
    width: 100vw;
    height: 100vh;
  }
`;

export default GlobalStyle;
