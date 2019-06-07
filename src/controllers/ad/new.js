import _ from 'lodash';
import Ad from '../../models/ad/ad';
import AdsCategories from '../../models/ad/category';
import Cities from '../../models/cities';
import Community from '../../models/community';
import Departments from '../../models/department';
/**
 * @route GET /ad/new
 * @desc Create new ad
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.index = async(req, res) => {
  const userCommunities = await Community.find({ members: req.user._id, is_enabled: true });

  if (userCommunities.length > 0) {
    res.render('ad/new', {
      categories: await AdsCategories.find(),
      departments: await Departments.find(),
      communities: await Community.find({ members: req.user._id })
    });
  } else {
    req.flash('warning', `You're not a member of any communities`);
    res.redirect('/community/new');
  }
};

/**
 * @route POST /ad/new
 * @desc Create new ad
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.new = async(req, res) => {
  const {
    community, title, category, city, description, pictures, uev
  } = req.body;

  const categoryId = await AdsCategories.findOne({ 'categories.slug': category })
    .select({ _id: 1 });
  const cityId = await Cities.findOne({ slug: city })
    .select({ _id: 1 });

  const newAd = new Ad({
    user: req.user._id,
    category: categoryId,
    title,
    description,
    uev,
    community,
    location: cityId,
    images: _.filter(pictures, el => el !== '')
  });

  newAd.save()
    .then(ad => {
      req.flash('success', 'Ad created!');
      res.redirect(`/ad/${ad.slug}`);
    })
    .catch(err => {
      console.error(err);
    });
};
