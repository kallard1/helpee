import path from "path";
import express, { Request, Response } from "express";
import ejsLocals from "ejs-locals";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import morgan from "morgan";
import winston from "./config/winston";
import router from "./routes/router";
import bdd from "./config/bdd";

const app = express();
// Express configuration
app.set("port", process.env.POST || 3000);
app.use(morgan("combined", { stream: winston.stream }));
app.set("views", path.join(__dirname, "../views"));
app.engine("ejs", ejsLocals);
app.set("view engine", "ejs");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(expressSession({
  secret: (process.env.SECRET_KEY !== undefined ? process.env.SECRET_KEY : ""),
  name: "helpee_session",
  cookie: {
    secure: true,
    httpOnly: true,
    domain: "helpee.fr",
    expires: new Date(Date.now() + 60 * 60 * 1000),
  },
}));
app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }),
);
app.use((err: any, req: Request, res: Response, next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

if (process.env.NODE_ENV !== "development") {
  bdd.init();
}

app.use("/", router);

export default app;
