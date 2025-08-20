import styled from 'styled-components';

export const FileMessageStyled = styled.div`
  position: relative;
  padding: 0rem 0rem 1.5rem 0.7rem;
  display: flex;
`;

export const MainSection = styled.div`
  flex-grow: 1;
  margin-top: 0.7rem;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

export const FileIconContainer = styled.div`
  width: 2.5rem;
  min-width: 2.5rem;
  margin-right: 1rem;
  color: #d1d1d1;
`;

export const FileInfoContainer = styled.div`
  flex-grow: 1;
  margin-right: 1rem;
`;

export const FileExtension = styled.span`
  font-size: 0.9rem;
  color: #e6e0e0;
  text-transform: uppercase;
`;

export const FileName = styled.span`
  display: block;
  white-space: nowrap;
  font-size: 1rem;
  color: white;
`;

export const FileSize = styled.span`
  font-size: 0.9rem;
  color: #c5ccd1;
  margin-right: 0.6rem;
`;

export const FileMetaContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 0.4rem;
  margin-bottom: 0.4rem;
`;
