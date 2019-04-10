import path from 'path';

import User from '../../models/user';

/**
 * GET /user/profile
 *
 * @param req
 * @param res
 */
exports.profile = async(req, res) => {
  console.log(req.user);
  res.render('user/profile');
};

exports.editProfilImage = async(req, res) => {
  res.render('user/upload');
};

exports.upload = async(req, res) => {
  const image = req.files.avatar;

  if (!/^image\/(png|jpe?g|gif)/.test(image.mimetype)) {
    req.flash('warning', `File ${image.name} is not a supported image. Please upload image with .png, .jpg, .jpeg or .gif extension`);
    res.redirect('/user/avatar-upload');
  } else {
    image.mv(`${path.resolve(process.env.UPLOAD_PATH || '/upload')}/${image.name}`, (err) => {
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
