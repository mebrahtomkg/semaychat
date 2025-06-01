/* eslint-disable jsx-a11y/media-has-caption */
import React, { FC } from 'react';
import PlaybackControlButton from './PlaybackControlButton';
import SmallMoreButton from '../SmallMoreButton';
import {
  AudioMessageStyled,
  AudioMetaContainer,
  ControlArea,
  MainSection,
  MoreButtonContainer,
  PlaybackTime,
  PlaybackTimeSliderContainer
} from './styles';
import useAudioPlaybackController from './useAudioPlaybackController';
import PlaybackTimeSlider from './PlaybackTimeSlider';
import MessageMeta from '../MessageMeta';
import { EnrichedMessage } from '../../types';

interface AudioMessageProps {
  enrichedMessage: EnrichedMessage;
  onMoreButtonClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const AudioMessage: FC<AudioMessageProps> = ({
  enrichedMessage,
  onMoreButtonClick
}) => {
  const { isOutgoing, status, fileUrl, time } = enrichedMessage;

  const {
    audioElementRef,
    isPlaying,
    handleLoadedMetadata,
    handleTimeUpdate,
    handlePlaybackEnded,
    timePercentage,
    setTimePercentage,
    togglePlayback,
    playbackTime
  } = useAudioPlaybackController();

  return (
    <AudioMessageStyled>
      <MainSection>
        <audio
          ref={audioElementRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handlePlaybackEnded}
          onLoadedMetadata={handleLoadedMetadata}
        >
          <source src={fileUrl} type="audio/mp3" />
        </audio>

        <ControlArea>
          <PlaybackControlButton
            isPlaying={isPlaying}
            onClick={togglePlayback}
          />
          <PlaybackTimeSliderContainer>
            <PlaybackTimeSlider
              timePercentage={timePercentage}
              onTimePercentageUpdate={setTimePercentage}
            />
            <PlaybackTime>{playbackTime}</PlaybackTime>
          </PlaybackTimeSliderContainer>
        </ControlArea>

        <MoreButtonContainer>
          <SmallMoreButton onClick={onMoreButtonClick} />
        </MoreButtonContainer>
      </MainSection>

      <AudioMetaContainer>
        <MessageMeta isOutgoing={isOutgoing} status={status} time={time} />
      </AudioMetaContainer>
    </AudioMessageStyled>
  );
};

export default AudioMessage;
