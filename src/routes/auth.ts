import csrf from "csurf";
import express from "express";

import * as registerController from "../controllers/auth/register";

const index = express.Router();
const csrfProtection = csrf({ cookie: true });

index.get("/register", csrfProtection, registerController.index);
index.post("/register", csrfProtection, registerController.registration);

export default index;
