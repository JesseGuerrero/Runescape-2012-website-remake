var express = require('express');
var router = express.Router();

//Determine if faster to have local images or github images

/* GET home page. */
router.get('/', function(req, res, next) {//https://web.archive.org/web/20120709052134/http://www.runescape.com:80/title.ws
  res.render('index', { layouts: 'layout.hbs'}); //images done
});

router.get('/news1', function(req, res, next) {//https://web.archive.org/web/20120704185400/http://services.runescape.com/m=news/behind-the-scenes-july
  res.render('pages/news-example1', { layout: 'layout-news.hbs' });
});

router.get('/news2', function(req, res, next) {//https://web.archive.org/web/20120704185400/http://services.runescape.com/m=news/behind-the-scenes-july
  res.render('pages/news-example2', { layout: 'layout-news.hbs' });
});

router.get('/media', function(req, res, next) {//remove
  res.redirect('/', {});
});

router.get('/game-guide', function(req, res, next) {//remove
  res.render('pages/game-guide', { layout: 'layout-gameguide.hbs' });
});

router.get('/beginners-guide', function(req, res, next) {//remove getting started, what's next
  res.render('pages/beginners-guide.hbs', { layout: 'layout-beginnersguide.hbs' });
});

router.get('/world', function(req, res, next) {//https://web.archive.org/web/20120731001805/http://www.runescape.com:80/world_locations.ws
  res.render('pages/world/world', { layout: 'layout-world.hbs' });
});

// router.get('/world/lumbridge', function(req, res, next) {//https://web.archive.org/web/20120731001805/http://www.runescape.com:80/world_locations.ws
//   res.render('pages/world', { layout: 'layout-world.hbs' });
// });

router.get('/rs-wiki', function(req, res, next) {
  res.redirect('https://runescape.wiki/', {});
});


router.get('/downloads', function(req, res, next) { https://web.archive.org/web/20120718053538/http://www.runescape.com/downloads.ws
  res.render('pages/downloads', { layout: 'layout-downloads.hbs' });
});

router.get('/customer-support', function(req, res, next) { https://web.archive.org/web/20120620024434/http://services.runescape.com:80/m=rswiki/en/Customer_Support
    res.render('pages/customer-support', { layout: 'layout-customersupport.hbs' });
});

router.get('/hall-of-heroes', function(req, res, next) { https://web.archive.org/web/20120620024338/http://services.runescape.com/m=hiscore/heroes.ws
    res.render('pages/hall-of-heroes', { layout: 'layout-hallofheroes.hbs' });
});

router.get('/highscores', function(req, res, next) { https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    res.render('pages/highscores', { layout: 'layout-highscores.hbs' });
});


module.exports = router;
