import styled from 'styled-components';

export const FileMessageStyled = styled.div`
  position: relative;
  padding: 0.7rem 0.4rem 0.1rem 0.7rem;
`;

export const MainContainer = styled.div`
  display: flex;
`;

export const FileInfoContainer = styled.div`
  padding: 0 0.7rem;
  align-self: center;
  line-height: 1.2;
`;

export const MoreButtonContainer = styled.div`
  display: flex;
`;

export const FileExtension = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  color: #d8d8d8;
  text-transform: uppercase;
`;

export const FileName = styled.span`
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  color: #bdc2c6;
`;

export const FileSize = styled.span`
  font-size: 0.85rem;
  font-weight: 400;
  color: #bdc2c6;
  margin-right: 0.6rem;
`;

export const FileMetaContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 0.4rem;
  margin-bottom: 0.4rem;
`;
