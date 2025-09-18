import { useCallback, useMemo, useRef, useState } from 'react';
import { isImage, shortenFileName } from '../../utils';
import { addMessageRequestFile } from '@/services/messageRequestFilesStore';
import { getFileExtension } from '@/utils';
import { useMessageRequestsStore } from '@/store';
import { Attachment } from './types';
import { getUniqueId } from '@/store/useMessageRequestsStore';

const useFilesSender = (
  files: File[],
  chatPartnerId: number,
  onClose: () => void,
) => {
  const lastIdRef = useRef<number>(1);

  const addFileMessageSendRequest = useMessageRequestsStore(
    (state) => state.addFileMessageSendRequest,
  );

  const createAttachment = useCallback(
    (file: File): Attachment => ({
      id: lastIdRef.current++,
      file,
      isImage: isImage(getFileExtension(file.name)),
      displayName: shortenFileName(file.name, 40),
    }),
    [],
  );

  const [attachments, setAttachments] = useState<Attachment[]>(() =>
    files.map(createAttachment),
  );

  const addFiles = useCallback(
    (files: File[]) => {
      setAttachments([...attachments, ...files.map(createAttachment)]);
    },
    [attachments, createAttachment],
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
  };
};

export default useFilesSender;
