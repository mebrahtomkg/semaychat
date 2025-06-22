import { FC, useMemo } from 'react';
import SendButton from '../SendButton';
import {
  ActionButtonsContainer,
  FilesContainer,
  FilesCount,
  FileSelectorModal,
  ModalFooter,
  ModalHeader,
  ModalTitle
} from './styles';
import { CloseButton } from '@/components/buttons';
import ImageFile from './ImageFile';
import OrdinaryFile from './OrdinaryFile';
import useFilesSender from './useFilesSender';
import AddButton from './AddButton';
import { useFilesSelector } from '../../hooks';

interface FileSelectorProps {
  files: File[];
  chatPartnerId: number;
  onClose: () => void;
}

const FileSelector: FC<FileSelectorProps> = ({
  files,
  chatPartnerId,
  onClose
}) => {
  const {
    attachments,
    selectionInfo,
    removeAttachment,
    updateAttachmentCaption,
    addFiles,
    sendAttachments
  } = useFilesSender(files, chatPartnerId, onClose);

  const attachmentComponents = useMemo(
    () =>
      attachments.map((attachment) =>
        attachment.isImage ? (
          <ImageFile
            key={`${attachment.id}`}
            attachment={attachment}
            onRemove={removeAttachment}
            onCaptionChange={updateAttachmentCaption}
          />
        ) : (
          <OrdinaryFile
            key={`${attachment.id}`}
            attachment={attachment}
            onRemove={removeAttachment}
          />
        )
      ),
    [attachments, removeAttachment, updateAttachmentCaption]
  );

  const { fileInputRef, handleFileChange, triggerFileSelection } =
    useFilesSelector(addFiles);

  return (
    <FileSelectorModal>
      <ModalHeader>
        <ModalTitle>Select Files</ModalTitle>
        <CloseButton onClick={onClose} />
      </ModalHeader>

      <FilesContainer>{attachmentComponents}</FilesContainer>

      <ModalFooter>
        <FilesCount>{selectionInfo}</FilesCount>

        <ActionButtonsContainer>
          <AddButton onClick={triggerFileSelection} />
          <SendButton
            onClick={sendAttachments}
            isDisabled={!attachments.length}
          />
        </ActionButtonsContainer>
      </ModalFooter>

      <input
        type="file"
        multiple
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </FileSelectorModal>
  );
};

export default FileSelector;
