import appRootPath from "app-root-path";
import winston from "winston";

const options: any = {
  file: {
    level: "info",
    filename: `${appRootPath}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 10,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger: any = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

logger.stream = {
  write: (message: any, encoding: any) => {
    logger.info(message);
  },
};

export default logger;
