import { addMessageMarkAsReadRequest } from '@/store/useMessageRequestsStore';
import { Message } from '@/types';
import { RefObject, useCallback, useEffect } from 'react';

const useMarkMessageAsRead = (
  messageElementRef: RefObject<HTMLDivElement | null>,
  containerElementRef: RefObject<HTMLDivElement | null>,
  message: Message,
) => {
  const handleIntersectionObserver: IntersectionObserverCallback = useCallback(
    (entries, observer) => {
      if (message.isSeen) return;

      const [entry] = entries;
      const root = observer.root as HTMLElement;
      const rootRect = root.getBoundingClientRect();
      const targetRect = entry.target.getBoundingClientRect();

      // If the target message element is scrolled in to view or even scrolled above the
      // root, mark it as read. since the message could be huge enough not to be visible
      // 100%(1.0 threshold) in the root.
      if (targetRect.bottom <= rootRect.bottom) {
        addMessageMarkAsReadRequest({
          chatPartnerId: message.senderId,
          messageId: message.id,
        });
      }
    },
    [message],
  );

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const messageElement = messageElementRef.current;
    const containerElement = containerElementRef.current;

    // Do intersection observe only if the message is not seen (marked as red) already
    if (!message.isSeen && messageElement && containerElement) {
      observer = new IntersectionObserver(handleIntersectionObserver, {
        root: containerElement,
        threshold: [0.0, 0.75, 1.0],
      });

      observer.observe(messageElement);
    }

    // Cleanup function
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [
    messageElementRef.current,
    containerElementRef.current,
    message.isSeen,
    handleIntersectionObserver,
  ]);
};

export default useMarkMessageAsRead;
