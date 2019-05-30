import Ad from '../../models/ad/ad';

/**
 * @route GET /ad/r:slug
 * @desc Get ad by slug
 * @access public
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.index = async(req, res) => {
  const ad = await Ad.findOne({ slug: req.params.slug, is_enabled: true })
    .populate({ path: 'user', select: 'firstname lastname' })
    .populate({ path: 'category', select: 'label slug' })
    .populate({ path: 'community', select: 'name slug' })
    .populate({ path: 'location', select: 'name zip_code slug' });

  res.render('ad/read', {
    ad
  });
};
