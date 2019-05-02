import AdsCategories from '../../models/ad/category';
import Cities from '../../models/cities';
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

/**
 * GET /ad/get-cities
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.cities = async(req, res) => {
  Cities.find({ 'department.code': req.query.department })
    .then((response) => {
      res.json(response);
    });
};
