import express from "express";

import * as homepageController from "../controllers/homepage";

const router = express.Router();

/* GET home page. */
router.get("/", homepageController.index);

export default router;
