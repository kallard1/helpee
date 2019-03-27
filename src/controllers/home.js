/**
 * GET /
 * Home page.
 *
 * @param req
 * @param res
 */
exports.index = async(req, res) => {
  res.render('homepage');
};
