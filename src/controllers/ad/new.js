/**
 * GET /ad/new
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.index = async(req, res) => {
  res.render('ad/new');
};
