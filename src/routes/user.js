import express from 'express';

import * as profileController from '../controllers/user/profile';

import { isLoggedIn } from '../middlewares/isLoggedIn';

const router = express.Router();

router.get('/profile', isLoggedIn, profileController.profile);

router.get('/edit-password', isLoggedIn, (req, res) => res.render('user/edit-password'));
router.post('/edit-password', isLoggedIn, profileController.editPassword);

router.get('/edit-email', isLoggedIn, (req, res) => res.render('user/edit-email'));
router.post('/edit-email', isLoggedIn, profileController.editEmail);

router.get('/edit-avatar', isLoggedIn, (req, res) => res.render('user/upload'));
router.post('/edit-avatar', isLoggedIn, profileController.upload);

router.get('/edit-description', isLoggedIn, (req, res) => res.render('user/edit-description'));
router.post('/edit-description', isLoggedIn, profileController.editDescription);

module.exports = router;
