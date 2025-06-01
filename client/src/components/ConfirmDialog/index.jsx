'use strict';

import React from 'react';
import styled from 'styled-components';
import ConfirmDialogWin from './ConfirmDialogWin';

const ConfirmDialogContainer = styled.div`
  padding: 1.3rem;
  border-radius: 10px;
  background: #222d4e;
`;

const ConfirmDialog = ({ isVisible, onOutsideClickHandler, children }) => {
  const onClickHandler = (event) => event.stopPropagation();

  return (
    isVisible && (
      <ConfirmDialogWin onClick={onOutsideClickHandler}>
        <ConfirmDialogContainer onClick={onClickHandler}>
          {children}
        </ConfirmDialogContainer>
      </ConfirmDialogWin>
    )
  );
};

export default ConfirmDialog;

export { default as ConfirmDialogTitle } from './ConfirmDialogTitle';
export { default as ConfirmDialogMessage } from './ConfirmDialogMessage';
export { default as ConfirmDialogButtonsContainer } from './ConfirmDialogButtonsContainer';
export { default as ConfirmButton } from './ConfirmButton';
export { default as CancelButton } from './CancelButton';
