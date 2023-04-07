let express = require('express');
let axios = require("../utils/axios");
const { getSkillIDByName, formatRSNickName, fetchSkills } = require("../utils/utils");
const auth = require("../auth.json");
let router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {//https://web.archive.org/web/20120709052134/http://www.runescape.com:80/title.ws
    axios.get(auth.webAPI + "web?page=1&limit=6&type=0")
        .then((response) => {
            res.render('index', { layouts: 'layout.hbs', articles: response['data'] });
        });
});

router.get('/world', function(req, res, next) {//https://web.archive.org/web/20120731001805/http://www.runescape.com:80/world_locations.ws
  res.render('pages/world/world', { layout: 'layout.hbs', world: true });
});

router.get('/rs-wiki', function(req, res, next) {
  res.redirect('https://runescape.wiki/', {});
});


router.get('/downloads', function(req, res, next) { //https://web.archive.org/web/20120718053538/http://www.runescape.com/downloads.ws
  res.render('pages/downloads', { layout: 'layout.hbs', downloads: true });
});

router.get('/hall-of-heroes', function(req, res, next) { //https://web.archive.org/web/20120620024338/http://services.runescape.com/m=hiscore/heroes.ws
    axios.get("https://darkan.org:8443/v1/highscores?page=1&limit=10")
        .then((response) => {
            res.render('pages/hall-of-heroes', { layout: 'layout.hbs', heroes: true, highscores: response });
        });
});

router.get('/temporal-hall-of-heroes', function(req, res, next) { //https://web.archive.org/web/20120620024338/http://services.runescape.com/m=hiscore/heroes.ws
    axios.get("http://localhost:8443/v1/temporal?page=1&limit=10")
        .then((response) => {
            res.render('pages/temporal-hall-of-heroes', { layout: 'layout.hbs', heroes: true, highscores: response, daysBack: req.params.days });
        });
});

router.get('/temporal-hall-of-heroes/:days', function(req, res, next) { //https://web.archive.org/web/20120620024338/http://services.runescape.com/m=hiscore/heroes.ws
    axios.get(`http://localhost:8443/v1/temporal?page=1&limit=10&daysBack=${req.params.days}`)
        .then((response) => {
            res.render('pages/temporal-hall-of-heroes', { layout: 'layout.hbs', heroes: true, highscores: response, daysBack: req.params.days });
        });
});

router.get('/highscores', function(req, res, next) { //https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    axios.get("https://darkan.org:8443/v1/highscores?page=" + 1 +"&limit=" + 22)
        .then((response) => {
            res.render('pages/highscores', { layout: 'layout.hbs', highscore: true, highscores: response, skill: "Overall", page: 1,
                limit: 22});
        });
});

router.get('/temporal-highscores', function(req, res, next) { //https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    axios.get("http://localhost:8443/v1/temporal?page=" + 1 +"&limit=" + 10)
        .then((response) => {
            res.render('pages/temporal-highscores', { layout: 'layout.hbs', highscore: true, highscores: response, skill: "Overall", page: 1,
                limit: 10, daysBack: 1});
        });
});

router.get('/temporal-highscores/overall/:days/:page/', function(req, res, next) { //https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    axios.get("http://localhost:8443/v1/temporal?page=" + req.params.page +"&limit=" + 10 + "&daysBack=" + req.params.days)
        .then((response) => {
            res.render('pages/temporal-highscores', { layout: 'layout.hbs', highscore: true, highscores: response, skill: "Overall", page: req.params.page,
                limit: 10, daysBack: req.params.days });
        });
});

router.get('/temporal-highscores/:skill/:days/:page/', function(req, res, next) { //https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    axios.get("http://localhost:8443/v1/temporal?page=" + req.params.page +"&limit=" + 10 + "&skill=" + getSkillIDByName(req.params.skill) + "&daysBack=" + req.params.days)
        .then((response) => {
            res.render('pages/temporal-highscores', { layout: 'layout.hbs', highscore: true, highscores: response, skill: req.params.skill,
                page: req.params.page, limit: 10, daysBack: req.params.days });
        });
});

router.get('/temporal-highscores-player/:user', function(req, res, next) { //https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    axios.get(`http://localhost:8443/v1/temporal/player?username=${req.params.user}&daysBack=1`)
        .then((response) => {
            let username = formatRSNickName(req.params.user)
            response = response['data']
            res.render('pages/temporal-player-highscores', { layout: 'layout.hbs', displayName: username, overallLevelsUp: response.overallLevelsUp,
                totalXP: response.totalXp, skillXPs: response.xpDifferential, overallRank: response.overallRank, levelsUp: response.levelsUp, xpRanks: response.xpRanks,
                playerHighscore: true, daysBack: 1 });
        })
});

router.get('/temporal-highscores-player/:user/:days', function(req, res, next) { //https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    axios.get(`http://localhost:8443/v1/temporal/player?username=${req.params.user}&daysBack=${req.params.days}`)
        .then((response) => {
            let username = formatRSNickName(req.params.user)
            response = response['data']
            res.render('pages/temporal-player-highscores', { layout: 'layout.hbs', displayName: username, overallLevelsUp: response.overallLevelsUp,
                totalXP: response.totalXp, skillXPs: response.xpDifferential, overallRank: response.overallRank, levelsUp: response.levelsUp, xpRanks: response.xpRanks,
                playerHighscore: true, daysBack: req.params.days });
        })
});


router.get('/grandexchange', function(req, res, next) { //https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    res.redirect('grandexchange/buy/1');
});

router.get('/grandexchange/buy/:page', function(req, res, next) { //https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    axios.get("https://darkan.org:8443/v1/ge/buy?page=" + req.params.page +"&limit=" + 22)
        .then((response) => {
            filteredList = { "data": [] }
            for(let i = 0; i < response['data'].length; i++)
                if(response['data'][i].state != 'FINISHED')
                    filteredList["data"].push(response['data'][i])
            console.log(response)
            res.render('pages/grandexchange', { layout: 'layout.hbs', highscore: true, itemListing: response, type: "buy", page: req.params.page,
                limit: 22});
        });
});

router.get('/grandexchange/sell/:page', function(req, res, next) { //https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    axios.get("https://darkan.org:8443/v1/ge/sell?page=" + req.params.page +"&limit=" + 22)
        .then((response) => {
            filteredList = { "data": [] }
            for(let i = 0; i < response['data'].length; i++)
                if(response['data'][i].state != 'FINISHED')
                    filteredList["data"].push(response['data'][i])
            res.render('pages/grandexchange', { layout: 'layout.hbs', highscore: true, itemListing: filteredList, type: "sell", page: req.params.page,
                limit: 22});
        });
});

router.get('/highscores/Overall/:page', function(req, res, next) { //https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    axios.get("https://darkan.org:8443/v1/highscores?page=" + req.params.page +"&limit=" + 22)
        .then((response) => {
            res.render('pages/highscores', { layout: 'layout.hbs', highscore: true, highscores: response, skill: "Overall", page: req.params.page,
                limit: 22});
        });
});

router.get('/highscores/:skill/:page', function(req, res, next) { //https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    axios.get("https://darkan.org:8443/v1/highscores?skill=" + getSkillIDByName(req.params.skill) + "&page=" + req.params.page +"&limit=" + 22)
        .then((response) => {
          res.render('pages/highscores', { layout: 'layout.hbs', highscore: true, highscores: response, skill: req.params.skill, page: req.params.page,
          limit: 22});
        });
});

router.get('/highscores/:skill', function(req, res, next) { //https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    axios.get("https://darkan.org:8443/v1/highscores?skill=" + getSkillIDByName(req.params.skill) + "&page=" + 1 +"&limit=" + 22)
        .then((response) => {
            res.render('pages/highscores', { layout: 'layout.hbs', highscore: true, highscores: response, skill: req.params.skill, page: 1,
                limit: 22});
        });
});

router.get('/highscores-player/:user', function(req, res, next) { //https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    axios.get(`https://darkan.org:8443/v1/highscores?limit=9999999`)
        .then((response) => {
            let username = formatRSNickName(req.params.user)
            let skillsData = fetchSkills(response, username);
            res.render('pages/player-highscores', { layout: 'layout.hbs',
                displayName: username, totalLevel: skillsData['totalLevel'], totalXP: skillsData['totalXP'],
                totalRank: skillsData['totalRank'], skillXPs: skillsData['skillXPs'],
                skillRanks: skillsData['skillRanks'], playerHighscore: true });
        })
});

module.exports = router;
