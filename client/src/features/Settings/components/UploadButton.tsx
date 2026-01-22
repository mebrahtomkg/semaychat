import { FC } from 'react';
import styled, { css } from 'styled-components';
import { TickIcon } from '@/components/icons';

const UploadButtonEnabled = styled.div<{ $isDisabled: boolean }>`
  width: 3rem;
  aspect-ratio: 1/1;
  padding: 0.5rem 0.6rem;
  transform: rotate(-45deg);
  color: #fff;
  border-radius: 50%;

  ${(props) =>
    props.$isDisabled
      ? css`
          background-color: var(--bg-action-disabled);
        `
      : css`
          background-color: var(--bg-action);
          &:hover {
            background-color: var(--bg-action-hover);
          }
        `}
`;

interface UploadButtonProps {
  onClick: () => void;
  isDisabled: boolean;
}

const UploadButton: FC<UploadButtonProps> = ({ onClick, isDisabled }) => {
  const handleClick = () => {
    if (!isDisabled) onClick();
  };

  return (
    <UploadButtonEnabled onClick={handleClick} $isDisabled={isDisabled}>
      <TickIcon />
    </UploadButtonEnabled>
  );
};

export default UploadButton;
