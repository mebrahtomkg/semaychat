import { EditIcon } from '@/components/icons';
import {
  EditButton,
  SettingLabel,
  SettingValue,
  ItemDetailsContainer,
  SettingsItemStyled,
} from './styles';
import { FC, ReactNode } from 'react';

interface SettingsItemProps {
  label: string;
  value: string;
  onEdit?: () => void;
  isLast?: boolean;
  actionButton?: ReactNode;
}

const SettingsItem: FC<SettingsItemProps> = ({
  label,
  value,
  isLast,
  onEdit,
  actionButton,
}) => {
  return (
    <SettingsItemStyled $isLast={isLast}>
      <ItemDetailsContainer>
        <SettingLabel>{label}</SettingLabel>
        <SettingValue>{value}</SettingValue>
      </ItemDetailsContainer>

      {actionButton}

      {onEdit && (
        <EditButton type="button" onClick={onEdit}>
          <EditIcon />
        </EditButton>
      )}
    </SettingsItemStyled>
  );
};

export default SettingsItem;
