import React, { FC } from 'react';
import styled from 'styled-components';
import { PauseIcon, PlayIcon } from '../../../../components/icons';

const PlaybackControlButtonStyled = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.65rem;
  align-self: center;
  border-radius: 40px;
  background: #2f43b1;
  color: #d1d1d1;
`;

interface PlaybackControlButtonProps {
  isPlaying: boolean;
  onClick: () => void;
}

const PlaybackControlButton: FC<PlaybackControlButtonProps> = ({
  isPlaying,
  onClick
}) => (
  <PlaybackControlButtonStyled type="button" onClick={onClick}>
    {isPlaying ? <PauseIcon /> : <PlayIcon />}
  </PlaybackControlButtonStyled>
);

export default PlaybackControlButton;
