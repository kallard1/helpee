import express from 'express';

import * as profileController from '../controllers/user/profile';

import { isLoggedIn } from '../middlewares/isLoggedIn';

const router = express.Router();

router.get('/profile', isLoggedIn, profileController.profile);

router.get('/avatar-upload', isLoggedIn, profileController.editProfilImage);
router.post('/avatar-upload', isLoggedIn, profileController.upload);

module.exports = router;
