import { useCallback, useMemo, useRef, useState } from 'react';
import { getFileExtension, isImage, shortenFileName } from '../../utils';
import { Attachment } from './types';
import { useAppDispatch } from '@/hooks';
import {
  fileMessageSendRequestAdded,
  getUniqueId
} from '../../slices/messageRequestsSlice';
import { addMessageRequestFile } from '@/services/messageRequestFilesStore';

const useFilesSender = (
  files: File[],
  chatPartnerId: number,
  onClose: () => void
) => {
  const lastIdRef = useRef<number>(1);

  const dispatch = useAppDispatch();

  const createAttachment = useCallback(
    (file: File): Attachment => ({
      id: lastIdRef.current++,
      file,
      isImage: isImage(getFileExtension(file.name)),
      displayName: shortenFileName(file.name, 40)
    }),
    []
  );

  const [attachments, setAttachments] = useState<Attachment[]>(() =>
    files.map(createAttachment)
  );

  const addFiles = useCallback(
    (files: File[]) => {
      setAttachments([...attachments, ...files.map(createAttachment)]);
    },
    [attachments, createAttachment]
  );

  const removeAttachment = useCallback((attachmentId: number) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((attachment) => attachment.id !== attachmentId)
    );
  }, []);

  const updateAttachmentCaption = useCallback(
    (attachmentId: number, newCaption: string) => {
      setAttachments((prevAttachments) =>
        prevAttachments.map((attachment) =>
          attachment.id === attachmentId
            ? { ...attachment, caption: newCaption }
            : attachment
        )
      );
    },
    []
  );

  const selectionInfo = useMemo(() => {
    if (!attachments.length) return '0 files selected';
    return `${attachments.length} file${attachments.length > 1 ? 's' : ''} selected`;
  }, [attachments.length]);

  const sendAttachments = useCallback(() => {
    attachments.map((attachment) => {
      const fileId = getUniqueId();
      addMessageRequestFile(fileId, attachment.file);
      dispatch(
        fileMessageSendRequestAdded({
          receiverId: chatPartnerId,
          fileId,
          caption: attachment.caption
        })
      );
    });
    onClose();
  }, [attachments, chatPartnerId, onClose, dispatch]);

  return {
    attachments,
    selectionInfo,
    removeAttachment,
    updateAttachmentCaption,
    addFiles,
    sendAttachments
  };
};

export default useFilesSender;
