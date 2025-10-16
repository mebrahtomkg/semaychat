import { NextIcon } from '@/components/icons';
import {
  ArrowIconContainer,
  Description,
  SettingsItemContainer,
  Title,
} from './styles';
import { FC } from 'react';

interface SettingsItemProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const ExpandableSettingsItem: FC<SettingsItemProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
    <SettingsItemContainer onClick={onClick}>
      <div>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </div>

      <ArrowIconContainer>
        <NextIcon />
      </ArrowIconContainer>
    </SettingsItemContainer>
  );
};

export default ExpandableSettingsItem;
