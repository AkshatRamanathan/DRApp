var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var FileStore = require('session-file-store')(session);
var indexRouter = require('./routes/index');
const mongoose = require('mongoose');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`, {
});

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new FileStore({
    path: './sessions',
    ttl: 5 * 60 * 1000, //5 mins
    retries: 2
  }), 
  cookie: {
    secure: false,
    maxAge: 3600000
  }
}));

app.use('/api', indexRouter);
app.use('/', (req, res) => res.send({ message: process.env.TEST }));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send({ error: 'error' });
});

module.exports = app;
