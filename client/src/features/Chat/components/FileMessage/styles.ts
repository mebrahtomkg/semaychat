import styled from 'styled-components';

export const FileMessageStyled = styled.div`
  position: relative;
  padding: 0rem 0rem 1.5rem 0.7rem;
  display: flex;
  border-radius: inherit;
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
  color: #e1ac0f;
`;

export const FileInfoContainer = styled.div`
  flex-grow: 1;
  margin-right: 1rem;
`;

export const FileExtension = styled.span`
  font-size: 0.9rem;
  color: inherit;
  text-transform: uppercase;
`;

export const FileName = styled.span`
  display: block;
  white-space: nowrap;
  font-size: 1rem;
  color: inherit;
`;

export const FileSize = styled.span`
  font-size: 0.9rem;
  color: inherit;
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
