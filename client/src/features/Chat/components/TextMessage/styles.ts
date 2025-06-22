import styled, { css } from 'styled-components';

export const TextMessageStyled = styled.div<{ $isOutgoing: boolean }>`
  position: relative;
  ${(props) =>
    props.$isOutgoing
      ? css`
          padding: 0.3rem 0.5rem 0.4rem 0.9rem;
        `
      : css`
          padding: 0.3rem 0.95rem 0.3rem 0.75rem;
        `}
`;

export const Content = styled.span`
  font-size: 1.032rem;
  font-weight: 500;
  line-height: 1.35;
  color: inherit;
  word-break: break-all;
`;

export const TextMsgMetaContainer = styled.div`
  padding: 0 0.4rem 0.4rem 0;
`;

export const HiddenMeta = styled(TextMsgMetaContainer)`
  display: inline;
  visibility: hidden;
`;

export const VisibleMeta = styled(TextMsgMetaContainer)`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
`;
