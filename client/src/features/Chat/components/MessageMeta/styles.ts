import styled, { css } from 'styled-components';

export const MessageMetaStyled = styled.div`
  background: transparent;
  display: inherit;
  align-items: center;
`;

export const Time = styled.span<{
  $isImageOrVideo: boolean;
  $isOutgoing: boolean;
}>`
  margin-right: 0.1rem;
  line-height: 1;
  font-size: 0.7rem;
  font-weight: 600;
  ${(props) =>
    props.$isImageOrVideo
      ? css`
          color: white;
        `
      : props.$isOutgoing
        ? css`
            color: var(--fg-msg-sent-time);
          `
        : css`
            color: var(--fg-msg-received-time);
          `}
`;

export const TickIconContainer = styled.div`
  display: inline-block;
  width: 1.05rem;
  transform: rotate(-45deg);
`;

export const ClockIconContainer = styled.div`
  display: inline-block;
  margin-left: 0.3rem;
  width: 0.9rem;
`;
