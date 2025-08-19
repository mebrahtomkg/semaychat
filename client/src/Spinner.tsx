

import styled, { css, keyframes } from 'styled-components';

const SpinnerPage = styled.div`
  position: fixed;
  z-index: 400;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.35);
`;

const SpinnerContainer = styled.div`
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #272d43;
  border-radius: 25px;
`;

const rotate = keyframes`${css`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`}
`;

const SpinnerCanvas = styled.canvas`
  animation: 1s linear infinite ${rotate};
`;

export default function Spinner() {
  const onMount = element => {
    if (element) {
      const ctx = element.getContext('2d');
      ctx.clearRect(0, 0, 120, 120);
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#6c868f';
      ctx.beginPath();
      ctx.arc(60, 60, 35, 0, 1.7 * Math.PI);
      ctx.stroke();
    }
  };    
  return (
    <SpinnerPage>      
      <SpinnerContainer>
        <SpinnerCanvas ref={onMount} width="120" height="120" />
      </SpinnerContainer>
    </SpinnerPage>
  );
}
