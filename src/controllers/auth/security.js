import passport from 'passport';

/**
 * GET Login page.
 *
 * @param req
 * @param res
 */
exports.index = async(req, res) => {
  if (req.user) {
    req.flash('warning', 'You are already logged in!');
    res.end();
    res.redirect('/');
  }
  res.render('auth/security/login', {
    csrfToken: req.csrfToken()
  });
};

/**
 * POST Login page.
 *
 * @param req
 * @param res
 * @param next
 */
exports.login = async(req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);
};

/**
 * GET Logout page.
 *
 * @param req
 * @param res

 */
exports.logout = async(req, res) => {
  req.logout();
  req.flash('success', 'You are logged out.');
  res.redirect('/auth/login');
};
