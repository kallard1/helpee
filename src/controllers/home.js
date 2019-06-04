import AdsCategories from '../models/ad/category';
import Community from '../models/community';
import User from '../models/user';

/**
 * @route GET /
 * @desc get homepage.
 * @access public
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.index = async(req, res) => {
  res.render('homepage', {
    communityCount: await Community.find({ is_enabled: true }).count(),
    userCount: await User.find({ is_enabled: true }).count(),
    categories: await AdsCategories.find()
  });
};
