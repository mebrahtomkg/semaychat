
import styled from 'styled-components';
import FlexibleIcon from './FlexibleIcon';

const SentMsgTailIconPath = styled.path`
  d: path('M0 0 C0 0 0 14 14 20 L14 24 L0 24 L0 0');
  fill: currentColor;
  stroke-width: 0px;
`;

const SentMsgTailIcon = ({ className }) => {
  return (
    <FlexibleIcon className={className}>
      <SentMsgTailIconPath d="" />
    </FlexibleIcon>
  );
};

export default SentMsgTailIcon;
