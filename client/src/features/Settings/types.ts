export interface PrivacySettingConfigItem {
  title: string;
  visibilityChoices: string[];
}

export interface SettingsItem {
  title: string;
  description: string;
  onClick?: () => void;
}
