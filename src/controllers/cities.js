import Cities from '../models/cities';

/**
 * GET /cities/get-cities-by-department
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getByDepartments = async(req, res) => {
  Cities.find({ 'department.code': req.query.department })
    .then((response) => {
      res.json(response);
    });
};
