import { FC, InputEventHandler, SyntheticEvent, useCallback } from 'react';
import {
  CaptionInput,
  ImageFileStyled,
  ImageStyled,
  ProgressText,
  ProgressTextContainer,
} from './styles';
import RemoveButton from '../RemoveButton';
import { useImageFileLoader } from '@/hooks';
import { PendingAttachment } from '../types';

interface ImageFileProps {
  attachment: PendingAttachment;
  onRemove: (attachmentId: number) => void;
  onCaptionChange: (attachmentId: number, newCaption: string) => void;
  onImageLoad: (
    attachmentId: number,
    e: SyntheticEvent<HTMLImageElement>,
  ) => void;
}

const ImageFile: FC<ImageFileProps> = ({
  attachment,
  onRemove,
  onCaptionChange,
  onImageLoad,
}) => {
  const { imageSrc, isImageLoading, handleImageLoad } = useImageFileLoader(
    attachment.file,
  );

  const remove = useCallback(
    () => onRemove(attachment.id),
    [attachment.id, onRemove],
  );

  const handleCaptionInput: InputEventHandler<HTMLInputElement> = useCallback(
    (e) => onCaptionChange(attachment.id, e.currentTarget.value),
    [attachment.id, onCaptionChange],
  );

  const handleImageLoadCombined = (e: SyntheticEvent<HTMLImageElement>) => {
    handleImageLoad(e);
    onImageLoad(attachment.id, e);
  };

  const caption =
    typeof attachment.caption === 'string' ? attachment.caption : '';

  return (
    <ImageFileStyled>
      <RemoveButton onClick={remove} />

      {imageSrc && (
        <ImageStyled
          src={imageSrc}
          onLoad={handleImageLoadCombined}
          alt="Image file"
        />
      )}

      {isImageLoading && (
        <ProgressTextContainer>
          <ProgressText>Loading Image...</ProgressText>
        </ProgressTextContainer>
      )}

      <CaptionInput
        type="text"
        value={caption}
        onInput={handleCaptionInput}
        placeholder="Add a caption..."
      />
    </ImageFileStyled>
  );
};

export default ImageFile;
