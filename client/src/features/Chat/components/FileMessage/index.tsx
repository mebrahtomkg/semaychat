import React, { FC, useMemo } from 'react';
import SmallMoreButton from '../SmallMoreButton';
import {
  FileExtension,
  FileIconContainer,
  FileInfoContainer,
  FileMessageStyled,
  FileMetaContainer,
  FileName,
  FileSize,
  MainSection,
} from './styles';
import { FileIcon } from '@/components/icons';
import MessageMeta from '../MessageMeta';
import { getSizeInAppropriateUnit, shortenFileName } from '../../utils';
import { Message } from '@/types';
import { MessageInfo } from '../../types';
import { getFileExtension } from '@/utils';

interface FileMessageProps {
  message: Message;
  messageInfo: MessageInfo;
  onMoreButtonClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const FileMessage: FC<FileMessageProps> = ({
  message,
  messageInfo,
  onMoreButtonClick,
}) => {
  const { isOutgoing, status, time } = messageInfo;

  const extension = useMemo(() => {
    return getFileExtension(message.attachment?.name);
  }, [message.attachment?.name]);

  return (
    <FileMessageStyled>
      <MainSection>
        <FileIconContainer>
          <FileIcon />
        </FileIconContainer>

        <FileInfoContainer>
          <FileName>
            {shortenFileName(message.attachment?.name as string, 20)}
          </FileName>
          <FileSize>
            {getSizeInAppropriateUnit(message.attachment?.size as number)}
          </FileSize>
          <FileExtension>{extension}</FileExtension>
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
