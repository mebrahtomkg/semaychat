'use strict';

import React from 'react';
import styled from 'styled-components';
import CheckBoxTick from './CheckBoxTick';

const CheckBoxWrapper = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
`;

const BoxContainer = styled.div`
  position: relative;
  width: 1.1rem;
  height: 1.1rem;
  margin-right: 0.8rem;
`;

const CheckBoxInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 110;
  border: none;
  border-radius: 1px;
  outline-style: solid;
  outline-width: 1px;
  outline-color: #dddddd;
  background: transparent;
  cursor: pointer;
`;

const CheckBoxLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #c3c3c3;
`;

const CheckBox = ({ isChecked, label, onClickHandler }) => {
  return (
    <CheckBoxWrapper>
      <BoxContainer>
        <CheckBoxInput type="text" readOnly onClick={onClickHandler} />
        {isChecked && <CheckBoxTick />}
      </BoxContainer>
      <CheckBoxLabel onClick={onClickHandler}>{label}</CheckBoxLabel>
    </CheckBoxWrapper>
  );
};

export default CheckBox;
