import styled from 'styled-components';
import { StyleProps } from '../../../../types';

export const TextInputContainer = styled.div`
  margin-bottom: 1rem;
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LabelStyled = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: ${(props: StyleProps) => props.theme.textColors?.normal};
  display: block;
`;

export const InputStyled = styled.input`
  width: 100%;
  padding: 1.2rem 0 0.5rem 0;
  margin-bottom: 0.7rem;
  box-shadow: none;
  outline-style: none;
  border: none;
  border-bottom: 1px solid #43829f;
  border-radius: 0;
  font-size: 1rem;
  font-weight: 500;
  color: #cfd3d4;
  background: transparent;
  &::placeholder {
    color: #6e6f74;
    font-family: system-ui, sans-serif;
    font-size: 1rem;
    font-weight: 500;
    font-weight: 500;
  }
  &:focus {
    border-color: #04c1ff;
  }
`;

export const HelperText = styled.span`
  display: block;
  color: ${(props: StyleProps) => props.theme.textColors?.description};
  font-size: 0.8rem;
  font-weight: 500;
`;
