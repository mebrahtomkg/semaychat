import React from 'react';
import styled, { css } from 'styled-components';
import { SelectedIcon } from '../../../../components/icons';

const SelectionCheckBoxStyled = styled.button<{ $isChecked: boolean }>`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  display: flex;
  border-radius: 50%;
  outline-style: solid;
  outline-width: 2px;
  outline-color: white;
  background: rgba(0, 0, 0, 0.15);
  transition:
    background 0.3s,
    outline-color 0.3s;
  ${(props) =>
    props.$isChecked &&
    css`
      background: #2339b7;
      outline-color: #2339b7;
    `}
`;

const SelectedIconContainer = styled.div<{ $isChecked: boolean }>`
  width: 1rem;
  height: 1rem;
  margin: auto;
  transition: transform 0.3s;
  ${(props) =>
    !props.$isChecked &&
    css`
      transform: scale(0);
    `}
`;

const SelectionCheckBox = ({ isChecked, onClick }) => {
  return (
    <SelectionCheckBoxStyled $isChecked={isChecked} onClick={onClick}>
      <SelectedIconContainer $isChecked={isChecked}>
        <SelectedIcon />
      </SelectedIconContainer>
    </SelectionCheckBoxStyled>
  );
};

export default SelectionCheckBox;
