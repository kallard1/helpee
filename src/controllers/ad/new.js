import AdsCategories from '../../models/ad/category';
import Community from '../../models/community';
import Departments from '../../models/department';

/**
 * GET /ad/new
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.index = async(req, res) => {
  res.render('ad/new', {
    categories: await AdsCategories.find(),
    departments: await Departments.find(),
    // eslint-disable-next-line no-underscore-dangle
    communities: await Community.find({ members: req.user._id })
  });
};
