import { Router } from "express";

import * as homepageController from "../controllers/home";

class Root {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get("/", homepageController.index);
  }
}

const rootRoutes = new Root();
export default rootRoutes.router;
