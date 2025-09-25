import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isImage, shortenFileName } from '../../utils';
import { addMessageRequestFile } from '@/services/messageRequestFilesStore';
import { getFileExtension, getImageDimensions } from '@/utils';
import { useMessageRequestsStore } from '@/store';
import { getUniqueId } from '@/store/useMessageRequestsStore';
import { LocalAttachment } from './types';

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
    async (file: File): Promise<LocalAttachment> => {
      const isImageFile = isImage(getFileExtension(file.name));

      let width: number | undefined;
      let height: number | undefined;

      if (isImageFile) {
        try {
          ({ width, height } = await getImageDimensions(file));
        } catch (err) {
          console.log(err);
        }
      }

      return {
        id: lastIdRef.current++,
        file,
        isImage: isImageFile,
        displayName: shortenFileName(file.name, 40),
        width,
        height,
      };
    },
    [],
  );

  const [attachments, setAttachments] = useState<LocalAttachment[]>([]);

  useEffect(() => {
    const init = async () => {
      const _attachments = [];
      for (const file of files) {
        _attachments.push(await createAttachment(file));
      }
      setAttachments(_attachments);
    };
    init();
  }, [files, createAttachment]);

  const addFiles = useCallback(
    async (files: File[]) => {
      const _attachments = [];
      for (const file of files) {
        _attachments.push(await createAttachment(file));
      }
      setAttachments([...attachments, ..._attachments]);
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
  };
};

export default useFilesSender;
