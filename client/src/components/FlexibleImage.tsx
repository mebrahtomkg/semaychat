/* eslint-disable styled-components-a11y/alt-text */
import { useEffect, useRef } from 'react';
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

const FlexibleImage = ({
  isPhotoNavTarget = false,
  isBlur = false,
  ...otherProps
}) => {
  const props = {};

  if (otherProps.onClick || isPhotoNavTarget) {
    props.role = 'button';
    props.tabIndex = 0;
  }

  if (isPhotoNavTarget) {
    props['data-is-photo-nav-target'] = 'true';
  }

  const imgRef = useRef(null);

  useEffect(() => {
    if (isPhotoNavTarget && imgRef.current) imgRef.current.focus();
  }, [isPhotoNavTarget]);

  return (
    <FlexibleImageStyled
      ref={imgRef}
      $isBlur={isBlur}
      {...props}
      {...otherProps}
    />
  );
};

export default FlexibleImage;
