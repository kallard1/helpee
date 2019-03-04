import csrf from "csurf";
import express, { Request } from "express";

import * as registerController from "../controllers/auth/register";

const index = express.Router();
const csrfProtection = csrf({ cookie: true });

index.get("/register", csrfProtection, registerController.index);
index.post("/registration", csrfProtection, registerController.registration);

export default index;
