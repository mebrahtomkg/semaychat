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

export const StatusIconContainer = styled.div`
  display: inline-block;
  margin-left: 0.2rem;
  width: 1.05rem;
`;

export const ClockIconContainer = styled.div`
  width: 0.9rem;
`;

export const TickIconContainer = styled.div`
  transform: rotate(-45deg);
`;
