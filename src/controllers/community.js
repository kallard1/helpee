import { validationResult } from 'express-validator/check';

import Community from '../models/community';

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

/**
 * Permet d'enregistrer une nouvelle communauté.
 * POST /community/save
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.save = async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('warning', errors.array());
    return res.redirect('/community/new');
  }

  const {
    name, zip_code, city, description
  } = req.body;

  const community = new Community({
    name,
    slug: 'test-test',
    description,
    zip_code,
    city,
    user: req.user,
    members: [req.user]
  });

  community.save().then(() => {
    req.flash('success', `Congratulation, you're community was created with success!`);
    // TODO: rediriger vers la page de la communauté
    res.redirect('/');
  }).catch((err) => {
    console.error(err);
  });
};
