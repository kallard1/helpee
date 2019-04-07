import express from 'express';

import * as newController from '../controllers/ad/new';
import * as searchController from '../controllers/ad/search';

const router = express.Router();

router.get('/new', newController.index);
router.get('/search', searchController.index);

module.exports = router;
