var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {//https://web.archive.org/web/20120709052134/http://www.runescape.com:80/title.ws
  res.render('index', {});
});

router.get('/news1', function(req, res, next) {//https://web.archive.org/web/20120704185400/http://services.runescape.com/m=news/behind-the-scenes-july
  res.render('news-example1', { layout: 'layout-news.hbs' });
});

router.get('/world', function(req, res, next) {//https://web.archive.org/web/20120731001805/http://www.runescape.com:80/world_locations.ws
  res.render('news-example1', { layout: 'layout-news.hbs' });
});

module.exports = router;
