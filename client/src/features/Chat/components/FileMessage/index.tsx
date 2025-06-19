import React, { FC } from 'react';
import SmallMoreButton from '../SmallMoreButton';
import {
  FileExtension,
  FileIconContainer,
  FileInfoContainer,
  FileMessageStyled,
  FileMetaContainer,
  FileName,
  FileSize,
  MainSection
} from './styles';
import { FileIcon } from '@/components/icons';
import MessageMeta from '../MessageMeta';
import { getSizeInAppropriateUnit, shortenFileName } from '../../utils';
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
      <MainSection>
        <FileIconContainer>
          <FileIcon />
        </FileIconContainer>

        <FileInfoContainer>
          <FileName>
            {shortenFileName(enrichedMessage.attachment.name, 20)}
          </FileName>
          <FileSize>
            {getSizeInAppropriateUnit(enrichedMessage.attachment.size)}
          </FileSize>
          <FileExtension>{enrichedMessage.attachment.extension}</FileExtension>
        </FileInfoContainer>
      </MainSection>

      <SmallMoreButton onClick={onMoreButtonClick} />

      <FileMetaContainer>
        <MessageMeta isOutgoing={isOutgoing} status={status} time={time} />
      </FileMetaContainer>
    </FileMessageStyled>
  );
};

export default FileMessage;
