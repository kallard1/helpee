/**
 * Affiche le formulaire de création d'une communauté
 * GET /community/new
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.new = async(req, res) => {
  res.render('community/new');
};
