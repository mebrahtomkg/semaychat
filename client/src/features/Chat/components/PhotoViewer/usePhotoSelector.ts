import { useSelector } from 'react-redux';
import { isImage } from '../../utils';
import { useMemo } from 'react';

const usePhotoSelector = (photo) => {
  const messages = useSelector((state) => state.messages);

  const { senderId: userOne, receiverId: userTwo } = photo;

  const photos = useMemo(
    () =>
      messages.filter(
        (message) =>
          isImage(message.fileExtension) &&
          ((message.senderId === userOne && message.receiverId === userTwo) ||
            (message.senderId === userTwo && message.receiverId === userOne))
      ),
    [messages, userOne, userTwo]
  );

  const targetIndex = useMemo(() => {
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].id === photo.id) return i;
    }
  }, [photos, photo]);

  return { photos, targetIndex };
};

export default usePhotoSelector;
