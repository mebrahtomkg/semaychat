import { VisibilityOption } from '@/types';

export interface IPrivacySetting {
  settingkey:
    | 'emailVisibility'
    | 'lastSeenVisibility'
    | 'profilePhotosVisibility'
    | 'messageSender';
  title: string;
  visibilityOptions: VisibilityOption[];
}
