import { FC, MouseEventHandler } from 'react';
import PlaybackControlButton from './PlaybackControlButton';
import SmallMoreButton from '../SmallMoreButton';
import {
  AudioMessageStyled,
  AudioMetaContainer,
  ControlArea,
  PlaybackTime,
  PlaybackTimeSliderContainer,
} from './styles';
import useAudioPlaybackController from './useAudioPlaybackController';
import PlaybackTimeSlider from './PlaybackTimeSlider';
import MessageMeta from '../MessageMeta';
import { MessageInfo } from '../../types';
import { Message } from '@/types';

interface AudioMessageProps {
  messageInfo: MessageInfo;
  message: Message;
  onMoreButtonClick: MouseEventHandler;
}

const AudioMessage: FC<AudioMessageProps> = ({
  messageInfo,
  message,
  onMoreButtonClick,
}) => {
  const { fileUrl } = messageInfo;

  const {
    audioElementRef,
    isPlaying,
    handleLoadedMetadata,
    handleTimeUpdate,
    handlePlaybackEnded,
    timePercentage,
    setTimePercentage,
    togglePlayback,
    playbackTime,
  } = useAudioPlaybackController();

  return (
    <AudioMessageStyled>
      {/** biome-ignore lint/a11y/useMediaCaption: <temp fix> */}
      <audio
        ref={audioElementRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handlePlaybackEnded}
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source src={fileUrl || undefined} type="audio/mp3" />
      </audio>

      <ControlArea>
        <PlaybackControlButton isPlaying={isPlaying} onClick={togglePlayback} />
        <PlaybackTimeSliderContainer>
          <PlaybackTimeSlider
            timePercentage={timePercentage}
            onTimePercentageUpdate={setTimePercentage}
          />
          <PlaybackTime>{playbackTime}</PlaybackTime>
        </PlaybackTimeSliderContainer>
      </ControlArea>

      <SmallMoreButton onClick={onMoreButtonClick} />

      <AudioMetaContainer>
        <MessageMeta message={message} />
      </AudioMetaContainer>
    </AudioMessageStyled>
  );
};

export default AudioMessage;
