import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import expressSession from "express-session";
import createError from "http-errors";
import logger from "morgan";
import path from "path";

import bdd from "./config/bdd";
import winston from "./config/winston";

import authRouter from "./routes/auth";
import indexRouter from "./routes/index";

const app = express();

// Session configuration
const session: any = {
  secret: process.env.SECRET_KEY || "",
  name: "helpee_session",
  cookie: {
    expires: new Date(Date.now() + 60 * 60 * 1000),
  },
  resave: false,
  saveUninitialized: true,
};

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
  session.cookie = {
    secure: true,
    httpOnly: true,
    domain: "helpee.fr",
  };
}

// Express configuration
app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(logger("combined", { stream: winston.stream }));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession(session));
app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }),
);
app.use(expressSession(session));

// Run migration on testing/production environment
if (process.env.NODE_ENV !== "development") {
  bdd.init();
}

app.use("/", indexRouter);
app.use("/auth/", authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
