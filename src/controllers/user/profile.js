import path from 'path';
import Community from '../../models/community';

import User from '../../models/user';

/**
 * @route GET /user/profile
 * @desc Get user profile
 * @access private
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.profile = async(req, res) => {
  const userMemberCommunities = await Community
    .find({
      members: req.user._id,
      is_enabled: true
    })
    .populate([
      {
        path: 'location',
        select: 'name zip_code'
      },
      {
        path: 'user',
        select: 'firstname lastname'
      }
    ]);

  res.render('user/profile', {
    userMemberCommunities
  });
};

/**
 * @route POST /user/edit-password
 * @desc Save new password
 * @access private
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.editPassword = async(req, res) => {
  const { password: oldPassword, newPassword } = req.body;

  User.findById(req.user._id)
    .then((user) => {
      user.comparePassword(oldPassword, (err, isMatch) => {
        if (err) return console.error(err);

        if (isMatch) {
          user.password = newPassword;

          user.save()
            .then(() => {
              req.flash('success', 'Password changed successfully!');
              res.redirect('/user/profile');
            });
        } else {
          req.flash('warning', 'Actual password seem incorrect');
          res.redirect('/user/edit-password');
        }
      });
    });
};

/**
 * @route POST /user/edit-email
 * @desc Save new email
 * @access private
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.editEmail = async(req, res) => {
  const { email } = req.body;

  User.findById(req.user._id)
    .then((user) => {
      user.email = email;

      user.save()
        .then(() => {
          req.flash('success', 'E-mail changed successfully!');
          res.redirect('/user/profile');
        });
    });
};

/**
 * @route POST /user/edit-description
 * @desc Save description
 * @access private
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.editDescription = async(req, res) => {
  const { description } = req.body;

  User.findById(req.user._id)
    .then((user) => {
      user.informations.description = description;

      user.save()
        .then(() => {
          req.flash('success', 'Description changed successfully!');
          res.redirect('/user/profile');
        });
    });
};

/**
 * @route POST /user/edit-avatar
 * @desc Save new avatar
 * @access private
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.upload = async(req, res) => {
  const image = req.files.avatar;

  if (!/^image\/(png|jpe?g|gif)/.test(image.mimetype)) {
    req.flash('warning', `File ${image.name} is not a supported image. Please upload image with .png, .jpg, .jpeg or .gif extension`);
    res.redirect('/user/avatar-upload');
  } else {
    image.mv(`${path.resolve('uploads/avatars')}/${image.name}`, (err) => {
      if (err) {
        return res.status(500)
          .send({ err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $set: {
            imageName: image.name
          }
        }, {},
        (error, doc) => {
          if (error) {
            return res.status(500)
              .send({ error });
          }
          req.flash('success', 'Image uploaded!');
          res.redirect('/user/profile');
        }
      );
    });
  }
};
