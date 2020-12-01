import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
    -webkit-font-smoothing: antialiased;
  }
  *, button, input {
    font-family: 'Roboto', sans-serif;
    border: 0;
    outline: 0;
  }
  button {
    cursor: pointer;
  }
`;
