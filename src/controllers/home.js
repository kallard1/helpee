import User from '../models/user';

/**
 * GET /
 * Home page.
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.index = async(req, res) => {
  res.render('homepage', {
    userCount: await User.estimatedDocumentCount()
  });
};
