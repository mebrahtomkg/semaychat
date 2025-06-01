import React, { FC } from 'react';
import SmallMoreButton from '../SmallMoreButton';
import {
  FileExtension,
  FileInfoContainer,
  FileMessageStyled,
  FileMetaContainer,
  FileName,
  FileSize,
  MainContainer,
  MoreButtonContainer
} from './styles';
import { FileIcon } from '../../../../components/icons';
import MessageMeta from '../MessageMeta';
import { getSizeInAppropriateUnit } from '../../utils';
import { EnrichedMessage } from '../../types';

interface FileMessageProps {
  enrichedMessage: EnrichedMessage;
  onMoreButtonClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const FileMessage: FC<FileMessageProps> = ({
  enrichedMessage,
  onMoreButtonClick
}) => {
  const { isOutgoing, status, time } = enrichedMessage;

  return (
    <FileMessageStyled>
      <MainContainer>
        <FileIcon />

        <FileInfoContainer>
          <FileName>{enrichedMessage.fileName}</FileName>
          <FileSize>
            {getSizeInAppropriateUnit(enrichedMessage.fileSize)}
          </FileSize>
          <FileExtension>{enrichedMessage.fileExtension}</FileExtension>
        </FileInfoContainer>

        <MoreButtonContainer>
          <SmallMoreButton onClick={onMoreButtonClick} />
        </MoreButtonContainer>
      </MainContainer>

      <FileMetaContainer>
        <MessageMeta isOutgoing={isOutgoing} status={status} time={time} />
      </FileMetaContainer>
    </FileMessageStyled>
  );
};

export default FileMessage;
