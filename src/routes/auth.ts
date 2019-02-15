import express from "express";
import csrf from "csurf";

import * as registerController from "../controllers/auth/register";

const index = express.Router();
const csrfProtection = csrf({ cookie: true });

index.get("/register", csrfProtection, registerController.index);
index.post("/registration", csrfProtection, registerController.registration);

export default index;
