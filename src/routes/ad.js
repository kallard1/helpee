import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn';

import * as newController from '../controllers/ad/new';
import * as searchController from '../controllers/ad/search';

const router = express.Router();

router.get('/new', isLoggedIn, newController.index);

router.get('/search', searchController.index);

module.exports = router;
