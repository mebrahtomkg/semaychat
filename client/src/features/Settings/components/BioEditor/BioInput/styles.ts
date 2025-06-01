import styled from 'styled-components';
import { InputStyled } from '../../TextInput/styles';

export const Counter = styled.p`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1.7;
  font-weight: 500;
  color: #bdbdbd;
`;

export const MultiLineInputContainer = styled.div`    display: flex;
    align-items: flex-end;
    margin-bottom: 1rem;`;

export const MultiLineInput = styled(InputStyled)<{
  as: string;
  rows: string;
  cols: string;
}>`    
  margin-bottom: 0;
    margin-right: 0.5rem;
    overflow: hidden;
    overflow-wrap: break-word;
    line-height: 1.7;
    resize: none;
`;
