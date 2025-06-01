import React, { FC, useCallback } from 'react';
import {
  CaptionInput,
  ImageFileStyled,
  ImageStyled,
  ProgressText,
  ProgressTextContainer
} from './styles';
import { Attachment } from '../types';
import RemoveButton from '../RemoveButton';
import { useImageFileLoader } from '../../../../../hooks';

interface ImageFileProps {
  attachment: Attachment;
  onRemove: (attachmentId: number) => void;
  onCaptionChange: (attachmentId: number, newCaption: string) => void;
}

const ImageFile: FC<ImageFileProps> = ({
  attachment,
  onRemove,
  onCaptionChange
}) => {
  const { imageSrc, isImageLoading, handleImageLoad } = useImageFileLoader(
    attachment.file
  );

  const remove = useCallback(
    () => onRemove(attachment.id),
    [attachment.id, onRemove]
  );

  const handleCaptionInput = useCallback(
    (e) => onCaptionChange(attachment.id, e.currentTarget.value),
    [attachment.id, onCaptionChange]
  );

  const caption =
    typeof attachment.caption === 'string' ? attachment.caption : '';

  return (
    <ImageFileStyled>
      <RemoveButton onClick={remove} />

      {imageSrc && (
        <>
          <ImageStyled
            src={imageSrc}
            onLoad={handleImageLoad}
            alt="Image file"
          />
        </>
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
