interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Asynchronously gets the natural width and height of an image from a File object.
 *
 * @param {File} imageFile - The File object representing the image.
 * @returns {Promise<ImageDimensions>} A Promise that resolves with the image's width and height.
 * @throws {Error} If the file is not an image, cannot be read, or the image cannot be loaded.
 */

const getImageDimensions = async (
  imageFile: File,
): Promise<ImageDimensions> => {
  return new Promise((resolve, reject) => {
    if (!imageFile.type.startsWith('image/')) {
      reject(new Error('Provided file is not an image.'));
      return;
    }

    // Use FileReader to read the file as a Data URL
    const reader = new FileReader();

    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;

      // Create an Image object to get dimensions
      const img = new Image();

      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };

      img.onerror = () => {
        reject(new Error('Failed to load image from Data URL.'));
      };

      // Set the image source to the Data URL
      img.src = dataUrl;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the image file.'));
    };

    // Start reading the file
    reader.readAsDataURL(imageFile);
  });
};

export default getImageDimensions;
