import { createGlobalStyle, css } from 'styled-components';

const styles = css`
  * {
    box-sizing: border-box;
  }

  :root {
    --bg-main: #232328;
    --bg-hover: #2b2b31;
    --bg-bright: #2c2c35;
    --bg-very-bright: #3c3c41;
    --bg-active-tab: #1e6f82;
    --bg-tab-divider: #1e6f82;
    --bg-overlay: #0000008f;
    --bg-button: #1e6f82;
    --bg-button-hover: #1e8097;
    --bg-button-disabled: #353f5d;
    --bg-text-input: #29343e;
    --bg-page: #0b0d14;
    --bg-name-initials: #005d27;
    --bg-msg-sent: #43136d;
    --bg-msg-received: #314352;

    --fg-text: #c8c8c8;
    --fg-normal: #f1f1f1;
    --fg-title: #ffffff;
    --fg-description: #9c9c9c;
    --fg-border: #464651;
    --fg-placeholder: #8f8f8f;
    --fg-button-disabled: #bababa;
    --fg-error: #db1d7c;
    --fg-radio-button: #11afd4;
  }

  html {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: system-ui, sans-serif;
  }

  body {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
    font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
      Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', 'Noto Color Emoji';
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.2;
    text-align: left;
    background-color: var(--bg-page);
    color: var(--fg-text);
  }

  body,
  header,
  main,
  footer,
  figure,
  nav,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  div,
  ul,
  li,
  label,
  input,
  textarea {
    display: block;
    margin: 0;
    padding: 0;
    font-family: system-ui, sans-serif;
    font-weight: 400;
  }

  span {
    display: inline;
    margin: 0;
    padding: 0;
    font-family: system-ui, sans-serif;
  }

  a {
    margin: 0;
    padding: 0;
    outline: none;
    border: none;
    text-decoration: none;
    color: inherit;
    background-color: inherit;
    cursor: pointer;
    font-family: system-ui, sans-serif;
  }

  a:hover {
    color: inherit;
    text-decoration: none;
  }

  a:active {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
    font-family: system-ui, sans-serif;
  }

  img {
    display: block;
    margin: 0;
    padding: 0;
    height: auto;
  }

  button {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
    border-radius: 0;
    font-family: system-ui, sans-serif;
    color: inherit;
  }

  label {
    margin: 0;
    padding: 0;
    display: inline;
    font-family: system-ui, sans-serif;
  }

  span {
    margin: 0;
    padding: 0;
    display: inline;
    font-family: system-ui, sans-serif;
  }

  textarea {
    overflow-x: hidden;
    overflow-y: auto;
    resize: none;
    border: none;
    outline: none;
  }

  input {
    outline: none;
    border: none;
    font-family: system-ui, sans-serif;
  }

  svg {
    margin: 0;
    padding: 0;
  }

  .svg-design-mode {
    position: fixed;
    z-index: 500;
    width: 80vw;
    top: 4vh;
    right: 2vw;
    background: rgb(25, 29, 41);
  }
`;

const GlobalStyle = createGlobalStyle` 
  ${styles}
`;

export default GlobalStyle;
