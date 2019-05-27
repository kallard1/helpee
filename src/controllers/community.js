import { validationResult } from 'express-validator/check';
import _ from 'lodash';

import Community from '../models/community';
import Departments from '../models/department';

/**
 * @route GET /community/new
 * @desc Show create community form
 * @access private
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.new = async(req, res) => {
  res.render('community/new', {
    departments: await Departments.find()
  });
};

/**
 * @route GET /community/:slug
 * @desc Get community by slug
 * @access private
 */
exports.getBySlug = async(req, res) => {
  const { slug } = req.params;

  Community
    .findOne({
      slug,
      is_enabled: true
    })
    .populate('location user members')
    .then(community => {
      res.render('community/community', {
        community,
        isAdmin: community.user._id.equals(req.user._id),
        isInCommunity: _.filter(community.members, m => m._id.equals(req.user._id))
      });
    });
};

/**
 * @route POST /community/save
 * @desc Add new community
 * @access private
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
  const { name, city, description } = req.body;

  const community = new Community({
    name,
    slug: 'test-test',
    description,
    location: city,
    user: req.user,
    members: [req.user]
  });

  community
    .save()
    .then(() => {
      req.flash('success', `Congratulation, you're community was created with success!`);
      // TODO: rediriger vers la page de la communauté
      res.redirect('/');
    })
    .catch(err => {
      console.error(err);
    });
};
