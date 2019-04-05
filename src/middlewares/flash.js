module.exports = () => {

  return (req, res, next) => {
    if (req.session) {
      if (req.session.flash) {
        res.locals.flash = req.session.flash;
        req.session.flash = undefined;
      }
    }

    req.flash = (type, content) => {
      if (req.session) {
        if (req.session.flash === undefined) {
          req.session.flash = {};
        }

        req.session.flash = { type, message: content };
      }
    };

    next();
  }
};
