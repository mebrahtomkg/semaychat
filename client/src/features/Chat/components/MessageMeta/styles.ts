import styled, { css } from 'styled-components';

export const MessageMetaStyled = styled.div`
  background: transparent;
  display: inherit;
  align-items: center;
`;

export const Time = styled.span<{ $isOutgoing: boolean }>`
  margin-right: 0.1rem;
  line-height: 1;
  font-size: 0.7rem;
  font-weight: 600;
  ${(props) =>
    props.$isOutgoing
      ? css`
          color: var(--fg-msg-sent-time);
        `
      : css`
          color: var(--fg-msg-received-time);
        `}
`;

export const TickIconContainer = styled.div`
  display: inline-block;
  width: 1.15rem;
  transform: rotate(-45deg);
`;

export const ProgressText = styled.span`
  font-size: 0.85rem;
  font-weight: 400;
`;
