import { validationResult } from 'express-validator/check';
import _ from 'lodash';
import Ad from '../models/ad/ad';

import Community from '../models/community';
import Departments from '../models/department';

/**
 * @route GET /
 * @desc List all communities
 * @access private
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.index = async(req, res) => {
  res.render('community/list', {
    communities: await Community.find({})
  });
};

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
    .then(async community => {
      console.info(await Ad.find({ community: community._id, is_enabled: true }, { community: 0 })
        .populate({
          path: 'user',
          select: 'firstname lastname'
        })
        .populate({
          path: 'category',
          select: 'label slug'
        }));

      res.render('community/community', {
        community,
        isAdmin: community.user._id.equals(req.user._id),
        isInCommunity: _.filter(community.members, m => m._id.equals(req.user._id)),
        ads: await Ad.find({ community: community._id, is_enabled: true }, { community: 0 })
          .populate({
            path: 'user',
            select: 'firstname lastname'
          })
          .populate({
            path: 'category',
            select: 'label slug'
          })
      });
    })
    .catch(() => res.status(404).render('error', {
      message: '404 - Page not found',
      error: {}
    }));
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

  const newCommunity = new Community({
    name,
    description,
    location: city,
    user: req.user,
    members: [req.user]
  });

  newCommunity
    .save()
    .then(community => {
      req.flash('success', `Congratulation, you're community was created with success!`);
      res.redirect(`/community/${community.slug}`);
    })
    .catch(err => {
      console.error(err);
    });
};
