import styled from 'styled-components';

export const PlaybackTimeSliderStyled = styled.div`
  position: relative;
  height: 1.2rem;
  display: flex;
  user-select: none;
`;

export const SliderTrack = styled.div`
  align-self: center;
  flex-grow: 5;
  display: flex;
  background-color: #04718a;
  user-select: none;
  border-radius: 100px;
`;

export const SliderProgress = styled.div`
  position: relative;
  width: 0%;
  height: 0.3rem;
  align-self: center;
  border-radius: inherit;
  background-color: var(--bg-action);
`;

export const SliderThumb = styled.div`
  position: absolute;
  top: -0.35rem;
  right: -0.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  background-color: var(--bg-action);
`;
