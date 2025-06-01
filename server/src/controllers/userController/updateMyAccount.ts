import {
  EMAIL_VISIBILITY,
  LAST_SEEN_VISIBILITY,
  PROFILE_PHOTOS_VISIBILITY,
  MESSAGE_SENDER,
} from '../../constants';
import User from '../../models/User';
import { filterUserData, hashPassword, verifyPassword } from '../../utils';
import {
  checkPassword,
  checkUsername,
  checkFirstName,
  checkLastName,
  checkBio,
} from './utils';
import { Request, Response, NextFunction } from 'express';

interface UpdateAccountRequest extends Request {
  body: Partial<User>;
}

const updateMyAccount = async (
  req: UpdateAccountRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;

    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    const updates: Partial<User> = {};

    let pwdVerified = false;
    if (Object.hasOwn(body, 'password')) {
      // const password = trimIfTypeIsString(body.password);
      const password =
        typeof body.password === 'string' ? body.password.trim() : null;

      if (!password || !checkPassword(password)) {
        return res.status(400).json({
          message: 'Invalid password',
        });
      }

      if (!(await verifyPassword(password, user.password))) {
        return res.status(401).json({
          message: 'Incorrect password',
        });
      }

      pwdVerified = true;
    }

    if (Object.hasOwn(body, 'newPassword')) {
      if (!pwdVerified) {
        return res.status(401).json({
          message: 'Current password is required to set new password',
        });
      }

      const newPassword =
        'newPassword' in body && typeof body.newPassword === 'string'
          ? body.newPassword.trim()
          : null;

      if (!newPassword || !checkPassword(newPassword)) {
        return res.status(400).json({
          message: 'Invalid new password',
        });
      }

      if (await verifyPassword(newPassword, user.password)) {
        return res.status(409).json({
          message: 'That was your old password',
        });
      }

      updates.password = await hashPassword(newPassword);
    }

    if (Object.hasOwn(body, 'username')) {
      const username =
        typeof body.username === 'string' ? body.username.trim() : null;

      if (username !== '') {
        if (!username || !checkUsername(username)) {
          return res.status(400).json({
            message: 'Invalid username',
          });
        }
      }

      if (username !== user.username) {
        if (username !== '') {
          if (await User.findOne({ where: { username } })) {
            return res.status(409).json({
              message: 'Username is taken',
            });
          }
        }

        updates.username = username;
      }
    }

    if (Object.hasOwn(body, 'firstName')) {
      const firstName =
        typeof body.firstName === 'string' ? body.firstName.trim() : null;

      if (!firstName || !checkFirstName(firstName)) {
        return res.status(400).json({
          message: 'Invalid first name',
        });
      }

      if (firstName !== user.firstName) {
        updates.firstName = firstName;
      }
    }

    if (Object.hasOwn(body, 'lastName')) {
      const lastName =
        typeof body.lastName === 'string' ? body.lastName.trim() : null;

      if (!checkLastName(lastName)) {
        return res.status(400).json({
          message: 'Invalid last name',
        });
      }

      if (lastName !== user.lastName) {
        updates.lastName = lastName;
      }
    }

    if (Object.hasOwn(body, 'bio')) {
      const bio = typeof body.bio === 'string' ? body.bio.trim() : null;

      if (!checkBio(bio)) {
        return res.status(400).json({
          message: 'Invalid bio',
        });
      }

      if (bio !== user.bio) {
        updates.bio = bio;
      }
    }

    if (Object.hasOwn(body, 'emailVisibility')) {
      const { emailVisibility } = body;

      if (
        !emailVisibility ||
        !EMAIL_VISIBILITY.visibilityChoices.includes(emailVisibility)
      ) {
        return res.status(400).json({
          message: 'Invalid email visibility value',
        });
      }

      if (emailVisibility !== user.emailVisibility) {
        updates.emailVisibility = emailVisibility;
      }
    }

    if (Object.hasOwn(body, 'lastSeenVisibility')) {
      const { lastSeenVisibility } = body;

      if (
        !lastSeenVisibility ||
        !LAST_SEEN_VISIBILITY.visibilityChoices.includes(lastSeenVisibility)
      ) {
        return res.status(400).json({
          message: 'Invalid last seen visibility value',
        });
      }

      if (lastSeenVisibility !== user.lastSeenVisibility) {
        updates.lastSeenVisibility = lastSeenVisibility;
      }
    }

    if (Object.hasOwn(body, 'profilePhotosVisibility')) {
      const { profilePhotosVisibility } = body;

      if (
        !profilePhotosVisibility ||
        !PROFILE_PHOTOS_VISIBILITY.visibilityChoices.includes(
          profilePhotosVisibility,
        )
      ) {
        return res.status(400).json({
          message: 'Invalid profile photos visibility value',
        });
      }

      if (profilePhotosVisibility !== user.profilePhotosVisibility) {
        updates.profilePhotosVisibility = profilePhotosVisibility;
      }
    }

    if (Object.hasOwn(body, 'messageSender')) {
      const { messageSender } = body;

      if (
        !messageSender ||
        !MESSAGE_SENDER.visibilityChoices.includes(messageSender)
      ) {
        return res.status(400).json({
          message: 'Invalid message sender value',
        });
      }

      if (messageSender !== user.messageSender) {
        updates.messageSender = messageSender;
      }
    }

    if (Object.keys(updates).length !== 0) {
      await User.update(updates, { where: { id: req.userId } });
    }

    const updatedAccount = await User.findByPk(req.userId);

    if (!updatedAccount)
      throw new Error('Failed to fetch updated user from db.');

    res.status(200).json({
      success: true,
      data: filterUserData(updatedAccount.toJSON()),
      message: 'User account updated successfully.',
    });
  } catch (err) {
    next(err);
  }
};

export default updateMyAccount;
