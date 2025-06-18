import { useContext, useMemo } from 'react';
import { useAppSelector } from '../../../hooks';
import type { PersistedMessage, PendingMessage } from '../types';
import { MRSContext } from '../MRS';

const useMessagesSelector = (
  chatPartnerId: number
): (PersistedMessage | PendingMessage)[] => {
  const messages = useAppSelector((state) => state.messages);

  const thisChatMessages = useMemo(
    () =>
      messages.filter(
        (message: PersistedMessage) =>
          message.receiverId === chatPartnerId ||
          message.senderId === chatPartnerId
      ),
    [chatPartnerId, messages]
  );

  const MRS = useContext(MRSContext);
  if (!MRS) throw Error('Invalid MRSContext');
  const { pendingMessages } = MRS;

  const thisChatPendingMessages = useMemo(
    () =>
      pendingMessages.filter((message) => message.receiverId === chatPartnerId),
    [chatPartnerId, pendingMessages]
  );

  const selectedMessages = useMemo(
    () => [...thisChatMessages, ...thisChatPendingMessages],
    [thisChatMessages, thisChatPendingMessages]
  );

  return selectedMessages;
};

export default useMessagesSelector;
