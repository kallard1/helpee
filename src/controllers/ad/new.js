import axios from 'axios';
import AdsCategories from '../../models/ad/category';

/**
 * GET /ad/new
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.index = async(req, res) => {
  res.render('ad/new', {
    categories: await AdsCategories.find(),
    departments
  });
};
