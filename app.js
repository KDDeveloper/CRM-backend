var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongo = require("./connection");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customerRouter = require("./routes/customerRoute")
var customerReqByAdminRouter = require("./routes/customerReqByAdmin")
var adminRouter = require("./routes/adminLoginRoute");
var agentRouter = require("./routes/agentRoute");
var jwt = require("jsonwebtoken")
var cors = require("cors")
var bodyParser = require("body-parser")

var app = express();
mongo.connect();
app.use(cors({ origin:"http://kd-crm.netlify.app", credentials: true }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})


// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use((req, res, next)=>{
  console.log(" common middleware Called!")
  next();
})
app.use("/customerRequest",customerRouter)
app.use("/admin",adminRouter);
app.use("/agent",agentRouter);

app.use("/customerRequestByAdmin",customerReqByAdminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
