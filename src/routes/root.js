import express from 'express';

import * as homepageController from '../controllers/home';

const router = express.Router();

router.get('/', homepageController.index);

module.exports = router;
