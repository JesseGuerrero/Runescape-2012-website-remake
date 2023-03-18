let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let sassMiddleware = require('node-sass-middleware');
let exphbs  = require('express-handlebars');
let methodOverride = require('method-override');
let mongoose = require('mongoose');
let indexRouter = require('./routes/index');
let articlesRouter = require('./routes/articles')
let usersRouter = require('./routes/users');
const axios = require("./utils/axios");
const fs = require('fs')
try {
  if (fs.existsSync("./auth.json"))
    ;
} catch(err) {
  fs.writeFile("./auth.json", JSON.stringify({
    "username": "admin",
    "password": "test",
    "uploadToken": "meme",
    "webAPI": "http://localhost:8443/v1/"
  }))
}
const auth = require("./auth.json")
const {authenticate, isModerator} = require("./utils/utils");
let app = express();

mongoose.connect('mongodb://localhost/darkan-server', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

// view engine setup
const hbs = require('./utils/helpers')(exphbs);

app.engine('hbs', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.get('/edit-news', async (req, res) => {
  // console.log(req.cookies.username)
  // console.log(req.cookies.password)
  // console.log(auth.username)
  // console.log(auth.password)
  if(isModerator(req))
    axios.get(auth.webAPI + "web?page=1&limit=99999&type=0")
        .then((response) => {
          res.render('articles/index', { layout: "layout-writenews", webAPI: auth.webAPI, articles: response["data"],
            isModerator: isModerator(req) });
        });
  else
    res.redirect('/');
})

app.post('/login', async (req, res) => {
  res.cookie("username", req.body.username)
  res.cookie("password", req.body.password)
  res.redirect('/edit-news');
});

app.get("/admin", (req, res) => {
  if(isModerator(req))
    res.redirect('/edit-news');
  else
    res.render('articles/auth', { layout: "layout-writenews" })
});
app.get('/logout', (req, res) => {
  res.cookie("username", "")
  res.cookie("password", "")
  res.redirect('/');
})
app.use('/news', articlesRouter);
app.use('/users', usersRouter);

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
