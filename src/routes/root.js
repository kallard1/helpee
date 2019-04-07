import express from 'express';

const router = express.Router();

import * as homepageController from '../controllers/home';

router.get('/', homepageController.index);

module.exports = router;
