import { VISIBILITY_OPTIONS } from '../constants';
import { User } from '../models';

interface Options {
  requesterIsBlocked: boolean;
  requesterIsContact: boolean;
}

interface FilteredUserData extends Partial<User> {
  acceptsMessage?: boolean;
}

/**
 * Filters the provided user data based on the user's privacy settings and the
 * provided options.
 *
 * @param userData  The user data.
 * @param options   Options
 * @param options.requesterIsBlocked  Whether the requester(accessor) is blocked by the user.
 * @param options.requesterIsContact  Whether the requester(accessor) is a contact of the user.
 * @returns Filtered user data.
 */
const applyUserPrivacy = (userData: User, options: Options) => {
  const { requesterIsBlocked, requesterIsContact } = options;

  const {
    id,
    firstName,
    lastName,
    username,
    bio,

    email,
    lastSeenAt,

    emailVisibility,
    lastSeenVisibility,
    profilePhotosVisibility,
    messageSender,

    profilePhoto,
  } = userData;

  const user: FilteredUserData = { id, firstName, lastName, username, bio };

  if (
    emailVisibility === VISIBILITY_OPTIONS.everybody ||
    (emailVisibility === VISIBILITY_OPTIONS.contacts && requesterIsContact)
  ) {
    user.email = email;
  }

  if (
    !requesterIsBlocked &&
    (lastSeenVisibility === VISIBILITY_OPTIONS.everybody ||
      (lastSeenVisibility === VISIBILITY_OPTIONS.contacts &&
        requesterIsContact))
  ) {
    user.lastSeenAt = lastSeenAt;
  }

  if (
    !requesterIsBlocked &&
    (profilePhotosVisibility === VISIBILITY_OPTIONS.everybody ||
      (profilePhotosVisibility === VISIBILITY_OPTIONS.contacts &&
        requesterIsContact))
  ) {
    user.profilePhoto = profilePhoto;
  }

  if (
    messageSender === VISIBILITY_OPTIONS.everybody ||
    (messageSender === VISIBILITY_OPTIONS.contacts && requesterIsContact)
  ) {
    user.acceptsMessage = true;
  }

  return user;
};

export default applyUserPrivacy;
