import { StyleProps } from '@/types';
import styled from 'styled-components';

export const MessageInputStyled = styled.div`
  position: relative;
  flex-grow: 1;
  max-width: 40rem;
  display: flex;
  margin-right: 10px;
  padding: 7px 10px 7px 23px;
  border-radius: 15px;
  cursor: text;

  background-color: ${(props: StyleProps) =>
    props.theme.backgroundColors.textInput};
`;

export const GrowingTextArea = styled.textarea`
  flex-grow: 1;
  align-self: center;
  max-height: 50vh;
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => props.theme.messageInput.color};
  background: transparent;
  &::placeholder {
    color: ${(props) => props.theme.messageInput.placeholder.color};
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ActionButtonsContainer = styled.div`
  align-self: flex-end;
  display: flex;
`;
