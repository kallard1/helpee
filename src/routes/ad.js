import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn';

import * as newController from '../controllers/ad/new';
import * as searchController from '../controllers/ad/search';
import * as readController from '../controllers/ad/read';

const router = express.Router();

router.get('/new', isLoggedIn, newController.index);
router.post('/new', isLoggedIn, newController.new);

router.get('/:slug', readController.index);

router.get('/search', searchController.index);

module.exports = router;
