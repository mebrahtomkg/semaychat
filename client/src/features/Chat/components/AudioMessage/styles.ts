import styled from 'styled-components';

export const AudioMessageStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const MainSection = styled.div`
  display: flex;
`;

export const ControlArea = styled.div`
  margin: 1rem 0rem 0rem 1rem;
  display: flex;
`;

export const AudioMetaContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0rem 0.4rem 0.4rem 0rem;
`;

export const PlaybackTimeSliderContainer = styled.div`
  width: 12rem;
  align-self: center;
  padding: 0 1rem;
`;

export const PlaybackTime = styled.span`
  display: block;
  font-size: 0.9rem;
  font-weight: 400;
  color: #d2d8dd;
  background: inherit;
`;

export const MoreButtonContainer = styled.div`
  margin-top: 0.3rem;
  display: flex;
`;
