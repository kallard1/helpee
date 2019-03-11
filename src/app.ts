import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import expressValidator from "express-validator";
import createError from "http-errors";
import lusca from "lusca";
import mongoose from "mongoose";
import logger from "morgan";
import path from "path";

import winston from "./config/winston";
import flash from "./middlewares/flash";

import authRouter from "./routes/auth";
import rootRouter from "./routes/root";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.launchConf();
  }

  private middleware(): void {
    this.express.set("port", process.env.PORT || 3000);

    this.express.set("views", path.join(__dirname, "../views"));
    this.express.set("view engine", "ejs");

    if (process.env.NODE_ENV === "production") {
      this.express.set("trust proxy", 1);
    }

    this.express.use(compression());
    this.express.use(logger("combined", { stream: winston.stream }));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(expressValidator());
    this.express.use(cookieParser());
    this.express.use(session({
      secret: process.env.SECRET_KEY || "secret",
      name: "helpee_session",
      cookie: {
        expires: new Date(Date.now() + 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "production",
        httpOnly: process.env.NODE_ENV === "production",
        domain: process.env.NODE_ENV === "production" ? "helpee.fr" : "",
      },
      resave: false,
      saveUninitialized: true,
    }));

    this.express.use(flash());
    this.express.use(lusca.xframe("SAMEORIGIN"));
    this.express.use(lusca.xssProtection(true));
    this.express.use(csurf({ cookie: true }));

    this.express.use("*", (req, res, next) => {
      res.locals.csrfToken = req.csrfToken();
      next();
    });

    this.express.use(express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }));

  }

  private routes(): void {
    this.express.use("/", rootRouter);
    this.express.use("/auth/", authRouter);
  }

  private launchConf() {
    mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost:27017/database", {
      useNewUrlParser: true,
      useCreateIndex: true,
    })
      .then(() => console.log("MongoDB connected..."))
      .catch((err) => {
        console.log("MongoDB connection error.");
        console.log(err);
        process.exit();
      });

    this.express.use((req: Request, res: Response, next: NextFunction) => {
      next(createError(404));
    });

    this.express.use((err: any, req: Request, res: Response, next: NextFunction) => {
      if (err.code !== "EBADCSRFTOKEN") return next(err);

      // handle CSRF token errors here
      res.status(403);
      res.render("error", {
        message: "CODE RED - NO CSRF TOKEN",
        error: {},
      });

      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

      // render the error page
      res.status(err.status || 500);
      res.render("error");
    });

    this.express.listen(this.express.get("port"), () => {
      // tslint:disable-next-line:no-console
      console.log(("  App is running at http://localhost:%d \
      in %s mode"), this.express.get("port"), this.express.get("env"));
      // tslint:disable-next-line:no-console
      console.log("  Press CTRL-C to stop\n");
    });
  }
}

export default new App().express;
