import { VisibilityOption } from '@/types';

export interface PrivacySetting {
  settingkey:
    | 'emailVisibility'
    | 'lastSeenVisibility'
    | 'profilePhotosVisibility'
    | 'messageSender';
  title: string;
  visibilityOptions: VisibilityOption[];
}
