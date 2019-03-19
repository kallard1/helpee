import { Router } from "express";

import * as newController from "../controllers/ad/new";
import * as searchController from "../controllers/ad/search";

class Ad {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get("/new", newController.index);
    this.router.get("/search", searchController.index);
  }
}

const adRoutes = new Ad();
export default adRoutes.router;
