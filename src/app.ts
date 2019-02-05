import path from "path";
import express, { Request, Response } from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import logger from "morgan";
import winston from "./config/winston";
import router from "./routes/router";
import Bdd from "./config/bdd";

const app = express();
// Express configuration
app.set("port", process.env.POST || 3000);
app.use(logger("combined", {stream: winston.stream}));
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(
    express.static(path.join(__dirname, "../public"), {maxAge: 31557600000})
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
    Bdd.init();
}

app.use("/", router);

export default app;