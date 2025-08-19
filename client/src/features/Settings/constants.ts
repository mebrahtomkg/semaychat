import { VisibilityOption } from '@/types';
import { PrivacySetting } from './types';

export const VISIBILITY_OPTION_LABELS: Record<VisibilityOption, string> = {
  everybody: 'Everybody',
  contacts: 'My Contacts',
  nobody: 'Only Me'
};

export const PRIVACY_SETTINGS: PrivacySetting[] = [
  {
    settingkey: 'emailVisibility',
    title: 'Who can see your email address?',
    visibilityOptions: ['everybody', 'contacts', 'nobody']
  },

  {
    settingkey: 'lastSeenVisibility',
    title: 'Who can see your last seen time?',
    visibilityOptions: ['everybody', 'contacts', 'nobody']
  },

  {
    settingkey: 'profilePhotosVisibility',
    title: 'Who can see your profile photos?',
    visibilityOptions: ['everybody', 'contacts', 'nobody']
  },

  {
    settingkey: 'messageSender',
    title: 'Who can send you messages?',
    visibilityOptions: ['everybody', 'contacts', 'nobody']
  }
];
