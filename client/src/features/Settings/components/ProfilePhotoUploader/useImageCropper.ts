import { RefObject, useCallback, useState } from 'react';
import { Position } from './types';

const CROPPING_ERRORS = {
  CROPPING_FAILED: 'Image cropping failed. Please try again.',
};

interface ImageCropperOptions {
  croppingViewportRef: RefObject<HTMLDivElement | null>;
  imageRef: RefObject<HTMLImageElement | null>;
  imagePosition: Position;
}

const useImageCropper = ({
  croppingViewportRef,
  imageRef,
  imagePosition,
}: ImageCropperOptions) => {
  const [isCropping, setIsCropping] = useState(false);
  const [error, setError] = useState<string>('');

  const cropImageAsync = useCallback(
    () =>
      new Promise<Blob | null>((resolve, reject) => {
        if (!imageRef.current || !croppingViewportRef.current) {
          reject('Failed to get DOM elements while cropping image.');
          return;
        }

        const viewportRect =
          croppingViewportRef.current.getBoundingClientRect();

        const image = imageRef.current;
        const imageRect = image.getBoundingClientRect();

        const pixelRatioX = image.naturalWidth / imageRect.width;
        const pixelRatioY = image.naturalHeight / imageRect.height;

        const sourceX = -1 * imagePosition.x * pixelRatioX;
        const sourceY = -1 * imagePosition.y * pixelRatioY;

        const sourceWidth = viewportRect.width * pixelRatioX;
        const sourceHeight = viewportRect.height * pixelRatioY;

        const destWidth = viewportRect.width;
        const destHeight = viewportRect.height;

        const canvas = document.createElement('canvas');
        canvas.width = viewportRect.width;
        canvas.height = viewportRect.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(
            image,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            0,
            0,
            destWidth,
            destHeight,
          );
        }

        canvas.toBlob((blob) => resolve(blob), 'image/png');
      }),
    [croppingViewportRef.current, imageRef.current, imagePosition],
  );

  const cropImage = useCallback(async () => {
    setIsCropping(true);

    // Important! Let the UI update (the setIsCropping state) before entering in to heavy task.
    await new Promise((resolve) => setTimeout(resolve, 50));

    let blob: Blob | null = null;
    try {
      blob = await cropImageAsync();
    } catch (err) {
      console.error(err);
      setError(CROPPING_ERRORS.CROPPING_FAILED);
    }
    setIsCropping(false);

    return blob;
  }, [cropImageAsync]);

  return { cropImage, isCropping, error };
};

export default useImageCropper;
