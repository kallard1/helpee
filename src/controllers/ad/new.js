import axios from 'axios';
import AdsCategories from '../../models/ad/category';

/**
 * GET /ad/new
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.index = async(req, res) => {
  let departments;

  await axios.get('https://geo.api.gouv.fr/departements')
    .then((data) => {
      departments = data.data;
    })
    .catch(e => console.error(e));

  res.render('ad/new', {
    categories: await AdsCategories.find(),
    departments
  });
};
