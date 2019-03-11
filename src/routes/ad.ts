import { Router } from "express";

import * as homepageController from "../controllers/ad/new";

class Ad {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get("/", homepageController.index);
  }
}

const adRoutes = new Ad();
export default adRoutes.router;
