import { Router } from "express";

import * as newController from "../controllers/ad/new";

class Ad {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get("/new", newController.index);
  }
}

const adRoutes = new Ad();
export default adRoutes.router;
