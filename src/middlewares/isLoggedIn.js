/**
 * Vérifie que l'utilisateur n'est pas connecté.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }

  req.flash('warning', 'You\'re are already logged in');
  res.redirect('/');
};

/**
 * Vérifie que l'utilisateur est connecté ou non.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('warning', 'You\'re not logged in');
  res.redirect('/auth/login');
};

/**
 * Vérifie que l'utilisateur est connecté et que c'est un administrateur
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const isLoggedInAndAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'ROLE_ADMIN') {
    return next();
  }

  req.flash('warning', 'You\'re not logged in or you\'re not right to perform this action');
  res.redirect('/');
};

module.exports = { isNotLoggedIn, isLoggedIn, isLoggedInAndAdmin };
