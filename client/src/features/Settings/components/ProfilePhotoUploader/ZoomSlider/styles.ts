import styled from 'styled-components';

export const ZoomSliderTrack = styled.div`
  position: relative;
  align-self: center;
  margin-right: 1rem;
  flex-grow: 5;
  height: 1.2rem;
  display: flex;
  user-select: none;
`;

export const SliderProgress = styled.div`
  align-self: center;
  flex-grow: 5;
  height: 3px;
  user-select: none;
  border-radius: 80px;
  background-color: var(--bg-action);
`;

export const SliderThumb = styled.div`
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  background-color: var(--bg-button-hover);
`;
