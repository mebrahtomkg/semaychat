import { StyleProps } from '@/types';
import styled from 'styled-components';

export const ChatStyled = styled.div`
  flex-grow: 1;
  margin-left: 0.1rem;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.page.backgroundColor};
`;

export const ChatHeader = styled.div`
  height: 3.5rem;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #314352;
  border-bottom: 1px solid;
  border-color: #3c576e;
  background-color: ${(props: StyleProps) => props.theme.backgroundColors.main};
`;

export const ChatMessagesListContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  &::-webkit-scrollbar {
    width: 4px;
    background-color: #131620;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #242a3d;
  }
`;

export const ChatMessagesList = styled.div`
  flex-grow: 1;
  max-width: 40rem;
  margin-top: auto;
  padding: 0 1rem;
`;

// Setting padding-bottom wasnt creating padding at the end of messages list
// This component is created to give gap.
export const Gap = styled.div`
  height: 1rem;
  width: 100%;
  background-color: transparent;
`;

export const ChatFooter = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 0.2rem;
  padding-bottom: 1.4rem;
  padding-left: 0.3rem;
  padding-right: 0.2rem;
  background-color: inherit;
`;
