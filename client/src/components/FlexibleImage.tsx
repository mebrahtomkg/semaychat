import {
  FC,
  HtmlHTMLAttributes,
  MouseEventHandler,
  SyntheticEvent,
  useEffect,
  useRef,
} from 'react';
import styled from 'styled-components';

export const FlexibleImageStyled = styled.img<{ $isBlur?: boolean }>`
  border-radius: inherit;
  margin: auto;
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
  filter: ${(props) => (props.$isBlur ? 'blur(10px)' : 'none')};
  &:focus {
    outline-style: none;
    border: none;
  }
`;

interface FlexibleImageProps {
  src?: string;
  alt?: string;
  onLoad?: (e: SyntheticEvent<HTMLImageElement>) => void;
  onError?: (e: SyntheticEvent<HTMLImageElement>) => void;
  onClick?: MouseEventHandler;
  isPhotoNavTarget?: boolean;
  isBlur?: boolean;
}

const FlexibleImage: FC<FlexibleImageProps> = ({
  src,
  alt = 'Image',
  onLoad,
  onError,
  onClick,
  isPhotoNavTarget = false,
  isBlur = false,
}) => {
  const props: HtmlHTMLAttributes<HTMLImageElement> & {
    'data-is-photo-nav-target'?: 'true';
  } = {};

  if (onClick || isPhotoNavTarget) {
    props.role = 'button';
    props.tabIndex = 0;
  }

  if (isPhotoNavTarget) {
    props['data-is-photo-nav-target'] = 'true';
  }

  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (isPhotoNavTarget && imgRef.current) imgRef.current.focus();
  }, [isPhotoNavTarget]);

  return (
    <FlexibleImageStyled
      ref={imgRef}
      src={src}
      alt={alt}
      onClick={onClick}
      onLoad={onLoad}
      onError={onError}
      $isBlur={isBlur}
      {...props}
    />
  );
};

export default FlexibleImage;
