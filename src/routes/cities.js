import express from 'express';

import * as citiesController from '../controllers/cities';

const router = express.Router();

router.get('/get-by-department', citiesController.getByDepartments);

module.exports = router;
