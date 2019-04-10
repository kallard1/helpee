exports.checkout = async(req, res) => {
  res.render('checkout/checkout');
};

exports.checkoutConfirmation = async(req, res) => {
  res.render('checkout/confirmation');
};
