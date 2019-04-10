import express from 'express';

import * as checkoutController from '../controllers/checkout/checkout';

const router = express.Router();

router.get('/', checkoutController.checkout);
router.get('/confirmation', checkoutController.checkoutConfirmation);

module.exports = router;
