export const VISIBILITY_OPTIONS = {
  everybody: 'everybody',
  contacts: 'contacts',
  nobody: 'nobody'
};

export const VISIBILITY_OPTION_LABELS = {
  [VISIBILITY_OPTIONS.everybody]: 'Everybody',
  [VISIBILITY_OPTIONS.contacts]: 'My Contacts',
  [VISIBILITY_OPTIONS.nobody]: 'Only Me'
};

export const PRIVACY_SETTINGS_CONFIG = {
  emailVisibility: {
    title: 'Who can see your email address?',
    visibilityChoices: [
      VISIBILITY_OPTIONS.everybody,
      VISIBILITY_OPTIONS.contacts,
      VISIBILITY_OPTIONS.nobody
    ]
  },

  lastSeenVisibility: {
    title: 'Who can see your last seen time?',
    visibilityChoices: [
      VISIBILITY_OPTIONS.everybody,
      VISIBILITY_OPTIONS.contacts,
      VISIBILITY_OPTIONS.nobody
    ]
  },

  profilePhotosVisibility: {
    title: 'Who can see your profile photos?',
    visibilityChoices: [
      VISIBILITY_OPTIONS.everybody,
      VISIBILITY_OPTIONS.contacts,
      VISIBILITY_OPTIONS.nobody
    ]
  },

  messageSender: {
    title: 'Who can send you messages?',
    visibilityChoices: [
      VISIBILITY_OPTIONS.everybody,
      VISIBILITY_OPTIONS.contacts,
      VISIBILITY_OPTIONS.nobody
    ]
  }
};
