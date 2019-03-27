import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import dotenv from 'dotenv';
import express from 'express';
import expressValidator from 'express-validator';
import { join } from 'path';
import logger from 'morgan';
import lusca from 'lusca';
import manifestHelpers from 'express-manifest-helpers';
import mongoose from 'mongoose';
import passport from 'passport';
import Redis from 'redis';
import redisStore from 'connect-redis';
import session from 'express-session';
import twig from 'twig';

import flash from './middlewares/flash';

import winston from './config/logger';

import authRouter from './routes/auth';
import rootRouter from './routes/root';

import config from './config/passport';

dotenv.config({ path: '.env' });

config(passport);

const app = express();
const RedisStore = redisStore(session);
const redis = Redis.createClient({
  host: 'sql.area42.fr'
});

/**
 * Middleware config.
 */
app.set('views', join(__dirname, '../views'));
twig.cache(process.env.NODE_ENV === 'production');
app.set('view engine', 'ejs');

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(compression());
app.use(logger('combined', { stream: winston.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
  store: new RedisStore({
    client: redis,
    host: 'sql.area42.fr',
    port: 6379,
    ttl: 260
  }),
  secret: process.env.SECRET_KEY || '',
  name: 'helpee_session',
  cookie: {
    expires: new Date(Date.now() + 60 * 60 * 1000),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: process.env.NODE_ENV === 'production',
    domain: process.env.NODE_ENV === 'production' ? 'helpee.fr' : ''
  },
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./middlewares/flash'));

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(csurf({ cookie: true }));

app.use(manifestHelpers({
  manifestPath: join(__dirname, '../public/manifest.json')
}));

app.use('*', (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(express.static(join(__dirname, '../public'), { maxAge: 31557600000 }));

/**
 * Routes.
 */
app.use('/', rootRouter);
app.use('/auth/', authRouter);

redis.on('ready', () => console.info('Redis ready!'));
redis.on('error', err => console.error(err));

/**
 * Mongoose config.
 */
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/database', {
  useNewUrlParser: true,
  useCreateIndex: true
})
  .then(() => console.info('MongoDB: Connected!'))
  .catch(err => console.error(err));

mongoose.connection.on('error', () => {
  console.error('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.render('error', {
    message: '404 - Page not found',
    error: {}
  });
});

// error handler
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  // handle CSRF token errors here
  res.status(403);
  res.render('error', {
    message: 'CODE RED - NO CSRF TOKEN',
    error: {}
  });

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
