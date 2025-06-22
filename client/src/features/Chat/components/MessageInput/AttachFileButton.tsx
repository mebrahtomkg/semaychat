import { FC } from 'react';
import styled from 'styled-components';
import { AttachmentIcon } from '@/components/icons';

const AttachFileButtonStyled = styled.button`
  margin-right: 0.5rem;
  width: 2.6rem;
  height: 2.6rem;
  padding: 0.55rem;
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out;
  color: #84929f;
  &:hover {
    background: #2e354f;
  }
`;

interface AttachFileButtonProps {
  onClick: () => void;
}

const AttachFileButton: FC<AttachFileButtonProps> = ({ onClick }) => (
  <AttachFileButtonStyled type="button" onClick={onClick}>
    <AttachmentIcon />
  </AttachFileButtonStyled>
);

export default AttachFileButton;
