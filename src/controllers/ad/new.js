import AdsCategories from '../../models/ad/category';
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
    departments: await Departments.find()
  });
};
