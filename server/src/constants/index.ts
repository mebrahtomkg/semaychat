import { VisibilityOption } from '@/types';

export const VISIBILITY_OPTIONS: Record<string, VisibilityOption> = {
  everybody: 'everybody',
  contacts: 'contacts',
  nobody: 'nobody',
};

export const EMAIL_VISIBILITY = {
  defaultValue: VISIBILITY_OPTIONS.contacts,
  visibilityChoices: [
    VISIBILITY_OPTIONS.everybody,
    VISIBILITY_OPTIONS.contacts,
    VISIBILITY_OPTIONS.nobody,
  ],
};

export const LAST_SEEN_VISIBILITY = {
  defaultValue: VISIBILITY_OPTIONS.everybody,
  visibilityChoices: [
    VISIBILITY_OPTIONS.everybody,
    VISIBILITY_OPTIONS.contacts,
    VISIBILITY_OPTIONS.nobody,
  ],
};

export const PROFILE_PHOTOS_VISIBILITY = {
  defaultValue: VISIBILITY_OPTIONS.everybody,
  visibilityChoices: [
    VISIBILITY_OPTIONS.everybody,
    VISIBILITY_OPTIONS.contacts,
    VISIBILITY_OPTIONS.nobody,
  ],
};

export const MESSAGE_SENDER = {
  defaultValue: VISIBILITY_OPTIONS.everybody,
  visibilityChoices: [
    VISIBILITY_OPTIONS.everybody,
    VISIBILITY_OPTIONS.contacts,
    VISIBILITY_OPTIONS.nobody,
  ],
};
