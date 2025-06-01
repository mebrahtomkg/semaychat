import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { getFileExtension, isImage, shortenFileName } from '../../utils';
import { Attachment } from './types';
import { MRSContext } from '../../MRS';

const useFilesSender = (files: File[], chatPartnerId: number, onClose) => {
  const lastIdRef = useRef<number>(1);

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

  const MRS = useContext(MRSContext);
  if (!MRS) throw Error('Invalid MRSContext');
  const { sendFileMessage } = MRS;

  const sendAttachments = useCallback(() => {
    attachments.map((attachment) => {
      sendFileMessage(chatPartnerId, attachment.file, attachment.caption);
    });
    onClose();
  }, [attachments, chatPartnerId, onClose, sendFileMessage]);

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
