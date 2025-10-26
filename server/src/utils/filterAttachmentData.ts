import { Attachment } from '@/models';

const filterAttachmentData = (attachment: Attachment) => {
  const { id, name, size, width, height, caption } = attachment.toJSON();

  return { id, name, size, width, height, caption };
};

export default filterAttachmentData;
