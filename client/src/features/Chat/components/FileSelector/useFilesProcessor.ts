import { SyntheticEvent, useCallback, useMemo, useRef, useState } from 'react';
import { isImage, shortenFileName } from '../../utils';
import { addMessageRequestFile } from '@/services/messageRequestFilesStore';
import { getFileExtension } from '@/utils';
import { useMessageRequestsStore } from '@/store';
import { getUniqueId } from '@/store/useMessageRequestsStore';
import { PendingAttachment } from './types';

const useFilesProcessor = (
  files: File[],
  chatPartnerId: number,
  onClose: () => void,
) => {
  const lastIdRef = useRef<number>(0);

  const addFileMessageSendRequest = useMessageRequestsStore(
    (state) => state.addFileMessageSendRequest,
  );

  const createAttachment = useCallback(
    (file: File): PendingAttachment => ({
      id: ++lastIdRef.current,
      file,
      isImage: isImage(getFileExtension(file.name)),
      displayName: shortenFileName(file.name, 40),
    }),
    [],
  );

  const [attachments, setAttachments] = useState<PendingAttachment[]>(() =>
    files.map(createAttachment),
  );

  const addFiles = useCallback(
    (files: File[]) =>
      setAttachments((prevAttachments) => [
        ...prevAttachments,
        ...files.map(createAttachment),
      ]),
    [createAttachment],
  );

  const removeAttachment = useCallback((attachmentId: number) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((attachment) => attachment.id !== attachmentId),
    );
  }, []);

  const updateAttachmentCaption = useCallback(
    (attachmentId: number, newCaption: string) => {
      setAttachments((prevAttachments) =>
        prevAttachments.map((attachment) =>
          attachment.id === attachmentId
            ? { ...attachment, caption: newCaption }
            : attachment,
        ),
      );
    },
    [],
  );

  const handleImageLoad = useCallback(
    (attachmentId: number, e: SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;

      const width = img.naturalWidth;
      const height = img.naturalHeight;

      setAttachments((prevAttachments) =>
        prevAttachments.map((attachment) =>
          attachment.id === attachmentId
            ? { ...attachment, width, height }
            : attachment,
        ),
      );
    },
    [],
  );

  const selectionInfo = useMemo(() => {
    if (!attachments.length) return '0 files selected';
    return `${attachments.length} file${attachments.length > 1 ? 's' : ''} selected`;
  }, [attachments.length]);

  const sendAttachments = useCallback(() => {
    attachments.forEach((attachment) => {
      const fileId = getUniqueId();

      addMessageRequestFile(fileId, attachment.file);

      addFileMessageSendRequest({
        receiverId: chatPartnerId,
        fileId,
        caption: attachment.caption,
        width: attachment.width,
        height: attachment.height,
      });
    });
    onClose();
  }, [attachments, chatPartnerId, onClose, addFileMessageSendRequest]);

  return {
    attachments,
    selectionInfo,
    removeAttachment,
    updateAttachmentCaption,
    addFiles,
    sendAttachments,
    handleImageLoad,
  };
};

export default useFilesProcessor;
