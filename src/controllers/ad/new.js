import _ from 'lodash';
import Ad from '../../models/ad/ad';
import AdsCategories from '../../models/ad/category';
import Cities from '../../models/cities';
import Community from '../../models/community';
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
    departments: await Departments.find(),
    // eslint-disable-next-line no-underscore-dangle
    communities: await Community.find({ members: req.user._id })
  });
};

exports.new = async(req, res) => {
  const {
    community, title, category, city, description, pictures, uev
  } = req.body;

  const categoryId = await AdsCategories.findOne({ 'categories.slug': category })
    .select({ _id: 1 });
  const cityId = await Cities.findOne({ slug: city })
    .select({ _id: 1 });

  const ad = new Ad({
    user: req.user._id,
    category: categoryId,
    title,
    slug: title, // TODO: convertir le titre en slug
    description,
    uev,
    community,
    location: cityId,
    images: _.filter(pictures, el => el !== '')
  });

  ad.save()
    .then(() => {
      req.flash('success', 'Ad created!');
      res.redirect('/'); // TODO: Rediriger vers la page de l'annonce (quand elle sera créée)
    })
    .catch((err) => {
      console.error(err);
    });
};
