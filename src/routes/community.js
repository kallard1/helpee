import express from 'express';

const router = express.Router();

import * as communityController from '../controllers/community';

router.get('/new', communityController.new);

module.exports = router;
