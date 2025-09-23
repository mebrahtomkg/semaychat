import styled from 'styled-components';

export const ConfirmDialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(0 0 0 / 37%);
`;

export const ConfirmDialogStyled = styled.div`
  padding: 1rem;
  border-radius: 10px;
  background-color: var(--bg-main);
`;

export const DialogTitle = styled.h3`
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  color: var(--fg-title);
`;

export const DialogMessage = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1rem;
  font-weight: 400;
  color: var(--fg-normal);
`;

export const DialogButtonsContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 1.16rem;
  line-height: 1;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
  color: var(--bg-button-hover);
  &:hover {
    background-color: var(--bg-bright);
  }
`;

export const CancelButton = styled(ActionButton)`
  margin-right: 0.5rem;
`;

export const ConfirmButton = styled(ActionButton)``;
