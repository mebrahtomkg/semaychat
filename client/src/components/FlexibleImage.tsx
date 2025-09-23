import {
  FC,
  HtmlHTMLAttributes,
  MouseEventHandler,
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
  filter: ${(props) => (props.$isBlur ? 'blur(15px)' : 'none')};
  &:focus {
    outline-style: none;
    border: none;
  }
`;

interface FlexibleImageProps {
  isPhotoNavTarget?: boolean;
  isBlur?: boolean;
  onClick?: MouseEventHandler;
  src?: string;
}

const FlexibleImage: FC<FlexibleImageProps> = ({
  isPhotoNavTarget = false,
  isBlur = false,
  onClick = undefined,
  src = '',
  ...otherProps
}) => {
  const props: HtmlHTMLAttributes<HTMLImageElement> = {};

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
      $isBlur={isBlur}
      onClick={onClick}
      src={src}
      {...props}
      {...otherProps}
    />
  );
};

export default FlexibleImage;
