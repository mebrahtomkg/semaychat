import styled, { css } from 'styled-components';
import { Theme } from '@/types';

const lightThemeProperties = css`
  --bg-main: #e2e2e2;
  --bg-secondary: green;
  --bg-hover: #d2d2d2;
  --bg-bright: #c4c4c6;
  --bg-very-bright: #9f9fa7;
  --bg-active-tab: #1e6f82;
  --bg-tab-divider: #1e6f82;
  --bg-overlay: #0000008f;
  --bg-button: #1e6f82;
  --bg-button-hover: #1e8097;
  --bg-button-disabled: #b4b8c7;
  --bg-text-input: #f2f2f2;
  --bg-page: #b4b8c7;
  --bg-name-initials: #005d27;
  --bg-msg-sent: #43136d;
  --bg-msg-received: #314352;
  --fg-text: black;
  --fg-secondary: #f6f6f6;
  --fg-secondary-description: #efefef;
  --fg-main: black;
  --fg-icon: #525252;
  --fg-normal: #1b1b1b;
  --fg-title: #333333;
  --fg-description: #595656;
  --fg-border: #c0c0c0;
  --fg-placeholder: #6c6c6c;
  --fg-button-disabled: #747474;
  --fg-error: #db1d7c;
  --fg-radio-button: #0843d5;
  --fg-button: #0843d5;
  --fg-icon-button: #ffffff;
  --fg-msg-time: #acacac;
`;

const darkThemeProperties = css`
  --bg-main: #232328;
  --bg-secondary: #2c2c35;
  --bg-hover: #2b2b31;
  --bg-bright: #2c2c35;
  --bg-very-bright: #3c3c41;
  --bg-active-tab: #1e6f82;
  --bg-tab-divider: #1e6f82;
  --bg-overlay: #0000008f;
  --bg-button: #1e6f82;
  --bg-button-hover: #1e8097;
  --bg-button-disabled: #343947;
  --bg-text-input: #29343e;
  --bg-page: #0b0d14;
  --bg-name-initials: #005d27;
  --bg-msg-sent: #43136d;
  --bg-msg-received: #314352;
  --fg-main: #f4f4f4;
  --fg-secondary: #efefef;
  --fg-secondary-description: #d4d4d4;
  --fg-icon: #f4f4f4;
  --fg-text: #c8c8c8;
  --fg-normal: #f1f1f1;
  --fg-title: #ffffff;
  --fg-description: #9c9c9c;
  --fg-border: #464651;
  --fg-placeholder: #8f8f8f;
  --fg-button-disabled: #9d9b9b;
  --fg-error: #db1d7c;
  --fg-radio-button: #11afd4;
  --fg-button: #a2b9f3;
  --fg-icon-button: #ffffff;
  --fg-msg-time: #b4b4b4;
`;

const AppThemeProvider = styled.div<{ $theme: Theme }>`
  ${(props) =>
    props.$theme === 'dark' ? darkThemeProperties : lightThemeProperties}
`;

export default AppThemeProvider;
