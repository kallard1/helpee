import appRoot from 'app-root-path'
import winston from 'winston'

let options: any = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 10,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

let logger: any = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
});

logger.stream = {
  write: (message: any, encoding: any) => {
    logger.info(message);
  }
};

export default logger;