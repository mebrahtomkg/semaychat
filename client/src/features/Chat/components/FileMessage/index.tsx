import { FC, MouseEventHandler, useMemo } from 'react';
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
import { getFileExtension } from '@/utils';

interface FileMessageProps {
  message: Message;
  onMoreButtonClick: MouseEventHandler;
}

const FileMessage: FC<FileMessageProps> = ({ message, onMoreButtonClick }) => {
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
        <MessageMeta message={message} />
      </FileMetaContainer>
    </FileMessageStyled>
  );
};

export default FileMessage;
