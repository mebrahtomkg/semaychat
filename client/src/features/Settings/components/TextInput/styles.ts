import styled from 'styled-components';

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
  color: var(--fg-normal);
  display: block;
`;

export const InputStyled = styled.input`
  width: 100%;
  padding: 1.2rem 0 0.5rem 0;
  margin-bottom: 0.7rem;
  box-shadow: none;
  outline-style: none;
  border: none;
  border-bottom: 1px solid var(--fg-border);
  border-radius: 0;
  font-size: 1rem;
  font-weight: 500;

  background-color: transparent;

  &::placeholder {
    color: var(--fg-placeholder);
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

  font-size: 0.8rem;
  font-weight: 500;
`;
