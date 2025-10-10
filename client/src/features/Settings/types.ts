import { Account, VisibilityOption } from '@/types';

export interface IPrivacySetting {
  settingkey: keyof Pick<
    Account,
    | 'emailVisibility'
    | 'lastSeenVisibility'
    | 'profilePhotosVisibility'
    | 'messageSender'
  >;
  title: string;
  visibilityOptions: VisibilityOption[];
}
