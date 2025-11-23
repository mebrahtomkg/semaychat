import { addMessageMarkAsReadRequest } from '@/store/useMessageRequestsStore';
import { Message } from '@/types';
import { RefObject, useCallback, useEffect } from 'react';

const useMarkMessageAsRead = (
  // intersection observer target is an html element that is rendered at the base of
  // the message element. By placing the intersection observer target element at the foot
  // of the overall message content we effectly know that the message is seen(read) or scrolled
  // to the top of the messages container. the magical case that foced us to do this is that a
  // message could be very big enough not to be visible 100%(1.0 threshold) in the root.
  intersectionObserverTargetRef: RefObject<HTMLDivElement | null>,
  intersectionObserverRootRef: RefObject<HTMLDivElement | null>,
  message: Message,
) => {
  const handleIntersectionObserver: IntersectionObserverCallback = useCallback(
    (entries, observer) => {
      if (message.isSeen) {
        return observer.disconnect();
      }

      const [entry] = entries;

      if (entry.isIntersecting) {
        observer.disconnect();

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
    const target = intersectionObserverTargetRef.current;
    const root = intersectionObserverRootRef.current;

    // Do intersection observe only if the message is not seen (marked as red) already
    if (!message.isSeen && target && root) {
      observer = new IntersectionObserver(handleIntersectionObserver, {
        root,
        // a threshold of '0.0' is the best option for handling edge cases in here.
        threshold: 0.0,
      });

      observer.observe(target);
    }

    // Cleanup function
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [
    intersectionObserverTargetRef.current,
    intersectionObserverRootRef.current,
    // Use message as dependency instead of message.isSeen to rerun the effect if message change.
    message,
    handleIntersectionObserver,
  ]);
};

export default useMarkMessageAsRead;
