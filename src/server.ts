import debug0 from "debug";
import http from "http";
import mongoose from "mongoose";

import app from "./app";

const debug = debug0("helpee:server");

const port: number = app.get("port") || 3000;
app.set("port", port);

const server = http.createServer(app);

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost:27017/database", {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
};

connectDb().then(async () => {
  server.listen(port);
  server.on("listening", onListening);
  server.on("error", onError);
}).catch((err) => {
  console.error(err);
});

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string"
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string"
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

export default server;
