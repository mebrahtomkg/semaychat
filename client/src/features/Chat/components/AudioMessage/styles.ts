import styled from 'styled-components';

export const AudioMessageStyled = styled.div`
  position: relative;
  padding: 0rem 0rem 1.5rem 1rem;
  display: flex;
`;

export const ControlArea = styled.div`
  flex-grow: 1;
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;

export const AudioMetaContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  padding: 0rem 0.4rem 0.4rem 0rem;
`;

export const PlaybackTimeSliderContainer = styled.div`
  flex-grow: 1;
  margin-right: 1rem;
`;

export const PlaybackTime = styled.span`
  display: block;
  font-size: 0.9rem;
  white-space: nowrap;
  color: inherit;
  background-color: transparent;
`;
