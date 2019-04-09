import { validationResult } from 'express-validator/check';

import AdCategory from '../../../models/adCategory';

exports.index = async(req, res) => {
  res.render('admin/ads/categories/index', {
    categories: await AdCategory.find()
  });
};

exports.new = async(req, res) => {
  res.render('admin/ads/category/new');
};

exports.edit = async(req, res) => {
  res.render('admin/ads/category/edit', {
    category: await AdCategory.findOne({ slug: req.params.slug })
  });
};

exports.save = async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('warning', errors.array());
    return res.redirect('/admin/ads/categories');
  }

  const { label, slug } = req.body;
  let category;

  if (req.params.id === undefined) {
    category = new AdCategory({
      label,
      slug
    });

    AdCategory.create(category, (err, doc) => {
      if (err) {
        return res.status(500)
          .send({ error: err });
      }

      req.flash('success', 'Category created!');
      res.redirect('/admin/ads/categories');
    });
  } else {
    AdCategory.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          label,
          slug
        }
      },
      {
        upsert: true,
        setDefaultsOnInsert: true
      },
      (err, doc) => {
        if (err) {
          return res.status(500)
            .send({ error: err });
        }

        req.flash('success', 'Category edited!');
        res.redirect('/admin/ads/categories');
      }
    );
  }
};

exports.delete = async(req, res) => {
  AdCategory.findOneAndRemove({ slug: req.params.slug }, (err, doc) => {
    if (err) {
      return res.status(500)
        .send({ error: err });
    }
    req.flash('success', 'Category deleted!');
    res.redirect('/admin/ads/categories');
  });
};
