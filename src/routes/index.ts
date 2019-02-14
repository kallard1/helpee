import express from "express";

import * as homepageController from "../controllers/homepage";

const index = express.Router();

/* GET home page. */
index.get("/", homepageController.index);

export default index;
