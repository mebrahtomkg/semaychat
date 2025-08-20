import { useMemo } from 'react';
import { Message, User } from '../../../../types';
import { formatDateTime } from '../../../../utils';
import useUser from './useUser';

const useChatItem = (user: User, lastMessage?: Message) => {
  const { fullName, nameInitials, photoUrl } = useUser(user);

  const messagePreview = useMemo(
    () => lastMessage?.content,
    [lastMessage?.content],
  );

  const messageDateTime = useMemo(
    () =>
      lastMessage?.createdAt ? formatDateTime(lastMessage.createdAt) : null,
    [lastMessage?.createdAt],
  );

  return { fullName, nameInitials, photoUrl, messagePreview, messageDateTime };
};

export default useChatItem;
