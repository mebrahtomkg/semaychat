import { FC, useMemo } from 'react';
import SendButton from '../SendButton';
import {
  ActionButtonsContainer,
  FilesContainer,
  FilesCount,
  FileSelectorModal,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from './styles';
import { CloseButton } from '@/components/buttons';
import ImageFile from './ImageFile';
import OrdinaryFile from './OrdinaryFile';
import AddButton from './AddButton';
import { useFilesSelector } from '../../hooks';
import useFilesProcessor from './useFilesProcessor';
import { User } from '@/types';

interface FileSelectorProps {
  files: File[];
  chatPartner: User;
  onClose: () => void;
}

const FileSelector: FC<FileSelectorProps> = ({
  files,
  chatPartner,
  onClose,
}) => {
  const {
    attachments,
    selectionInfo,
    removeAttachment,
    updateAttachmentCaption,
    addFiles,
    sendAttachments,
    handleImageLoad,
  } = useFilesProcessor(files, chatPartner, onClose);

  const attachmentComponents = useMemo(
    () =>
      attachments.map((attachment) =>
        attachment.isImage ? (
          <ImageFile
            key={`${attachment.id}`}
            attachment={attachment}
            onRemove={removeAttachment}
            onCaptionChange={updateAttachmentCaption}
            onImageLoad={handleImageLoad}
          />
        ) : (
          <OrdinaryFile
            key={`${attachment.id}`}
            attachment={attachment}
            onRemove={removeAttachment}
          />
        ),
      ),
    [attachments, handleImageLoad, removeAttachment, updateAttachmentCaption],
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
