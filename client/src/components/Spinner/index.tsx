import { RefCallback } from 'react';
import { SpinnerCanvas, SpinnerContainer, SpinnerPage } from './styles';

const Spinner = () => {
  const handleCanvasMount: RefCallback<HTMLCanvasElement> = (element) => {
    if (!element) return;

    const ctx = element.getContext('2d');

    if (!ctx) return;

    ctx.clearRect(0, 0, 120, 120);
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#6c868f';
    ctx.beginPath();
    ctx.arc(60, 60, 35, 0, 1.7 * Math.PI);
    ctx.stroke();
  };

  return (
    <SpinnerPage>
      <SpinnerContainer>
        <SpinnerCanvas ref={handleCanvasMount} width="120" height="120" />
      </SpinnerContainer>
    </SpinnerPage>
  );
};

export default Spinner;
