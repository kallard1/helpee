import AdsCategories from '../models/adCategory';

/**
 * GET /
 * Home page.
 *
 * @param req
 * @param res
 */
exports.index = async(req, res) => {
  res.render('homepage', {
    categories: await AdsCategories.find()
  });
};
