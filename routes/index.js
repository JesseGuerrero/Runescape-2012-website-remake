let express = require('express');
let axios = require("../utils/axios");
const {getSkillIDByName, formatRSNickName} = require("../utils/constants");
const Article = require("../utils/article");
let router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {//https://web.archive.org/web/20120709052134/http://www.runescape.com:80/title.ws
  let articles = await Article.find().sort({ createdAt: 'desc' })
    if(articles.length > 6)
        articles = articles.slice(0, 6)
  res.render('index', { layouts: 'layout.hbs', articles: articles }); //images done
});

router.get('/news1', function(req, res, next) {//https://web.archive.org/web/20120704185400/http://services.runescape.com/m=news/behind-the-scenes-july
  res.render('pages/news-example1', { layout: 'layout.hbs', news: true });
});

router.get('/news2', function(req, res, next) {//https://web.archive.org/web/20120704185400/http://services.runescape.com/m=news/behind-the-scenes-july
  res.render('pages/news-example2', { layout: 'layout.hbs', news: true });
});

router.get('/news3', function(req, res, next) {//https://web.archive.org/web/20120704185400/http://services.runescape.com/m=news/behind-the-scenes-july
    res.render('pages/news-example3', { layout: 'layout.hbs', news: true });
});

router.get('/news4', function(req, res, next) {//https://web.archive.org/web/20120704185400/http://services.runescape.com/m=news/behind-the-scenes-july
    res.render('pages/news-example4', { layout: 'layout.hbs', news: true });
});

router.get('/write-news', function(req, res, next) {//https://web.archive.org/web/20120704185400/http://services.runescape.com/m=news/behind-the-scenes-july
    res.render('pages/form-fields.hbs', { layout: 'layout-writenews' });
});

router.get('/media', function(req, res, next) {//remove
  res.redirect('/', {});
});

router.get('/game-guide', function(req, res, next) {//remove
  res.render('pages/game-guide', { layout: 'layout-gameguide.hbs' });
});

router.get('/beginners-guide', function(req, res, next) {//remove getting started, what's next
  res.render('pages/beginners-guide.hbs', { layout: 'layout.hbs', beginnersGuide: true });
});

router.get('/world', function(req, res, next) {//https://web.archive.org/web/20120731001805/http://www.runescape.com:80/world_locations.ws
  res.render('pages/world/world', { layout: 'layout.hbs', world: true });
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
    axios.get("https://darkan.org:8443/v1/highscores?page=1&limit=10")
        .then((response) => {
            res.render('pages/hall-of-heroes', { layout: 'layout.hbs', heroes: true, highscores: response });
        });
});

router.get('/highscores', function(req, res, next) { https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    axios.get("https://darkan.org:8443/v1/highscores?page=" + 1 +"&limit=" + 22)
        .then((response) => {
            res.render('pages/highscores', { layout: 'layout-highscores.hbs', highscores: response, skill: "Overall", page: 1,
                limit: 22});
        });
});

router.get('/highscores/Overall/:page', function(req, res, next) { //https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    axios.get("https://darkan.org:8443/v1/highscores?page=" + req.params.page +"&limit=" + 22)
        .then((response) => {
            res.render('pages/highscores', { layout: 'layout-highscores.hbs', highscores: response, skill: "Overall", page: req.params.page,
                limit: 22});
        });
});

router.get('/highscores/:skill/:page', function(req, res, next) { //https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    axios.get("https://darkan.org:8443/v1/highscores?skill=" + getSkillIDByName(req.params.skill) + "&page=" + req.params.page +"&limit=" + 22)
        .then((response) => {
          res.render('pages/highscores', { layout: 'layout-highscores.hbs', highscores: response, skill: req.params.skill, page: req.params.page,
          limit: 22});
        });
});

router.get('/highscores/:skill', function(req, res, next) { //https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    axios.get("https://darkan.org:8443/v1/highscores?skill=" + getSkillIDByName(req.params.skill) + "&page=" + 1 +"&limit=" + 22)
        .then((response) => {
            res.render('pages/highscores', { layout: 'layout-highscores.hbs', highscores: response, skill: req.params.skill, page: 1,
                limit: 22});
        });
});

router.get('/highscores-player/:user', function(req, res, next) { //https://web.archive.org/web/20120608083454/http://services.runescape.com:80/m=hiscore/overall.ws?category_type=0&table=0
    axios.get(`https://darkan.org:8443/v1/highscores?limit=9999999`)
        .then((response) => {
            let username = formatRSNickName(req.params.user)
            let skillsData = fetchSkills(response, username);
            console.log(skillsData)
            res.render('pages/player-highscores', { layout: 'layout-playerhighscores.hbs',
                displayName: username, totalLevel: skillsData['totalLevel'], totalXP: skillsData['totalXP'],
                totalRank: skillsData['totalRank'], skillXPs: skillsData['skillXPs'],
                skillRanks: skillsData['skillRanks'] });
        })
});

const fetchSkills = function (playerData, displayName) {
    playerData = playerData['data']
    let skillXPArr = []
    let skillRankArr = []
    let rank = -1;
    for(let i = 0; i < playerData.length; i++) {
        if(playerData[i].displayName === displayName) {
            for(let skillI = 0; skillI < 25; skillI++)
                skillXPArr.push(playerData[i].xp[skillI])
            break
        }
    }
    function sortSkill(skillI) {
        if(skillI >=0 && skillI <= 24)
            return function (user1, user2) {
                if (user1.xp[skillI] < user2.xp[skillI])
                    return 1
                else if (user1.xp[skillI] > user2.xp[skillI])
                    return -1
                else if (user1.xp[skillI] == user2.xp[skillI])
                    return -1
                return 0
            }
        return function (user1, user2) {
            if(user1.totalLevel < user2.totalLevel)
                return 1
            else if(user1.totalLevel > user2.totalLevel)
                return -1
            else if(user1.totalLevel == user2.totalLevel)
                if(user1.totalXp < user2.totalXp)
                    return 1
                else if(user1.totalXp > user2.totalXp)
                    return -1
            return 0
        }
    }
    for(let i = 0; i < 25; i++) {
        playerData.sort(sortSkill(i));
        for(let j = 0; j < playerData.length; j++) {
            if(playerData[j].displayName === displayName) {
                skillRankArr.push(j+1)
            }
        }
    }
    playerData.sort(sortSkill(-1))
    let totalXP = 0;
    let totalLevel = 1;
    for(let i = 0; i < playerData.length; i++) {
        if(playerData[i].displayName === displayName) {
            rank = i+1;
            totalXP = playerData[i].totalXp
            totalLevel = playerData[i].totalLevel
        }
    }

    return {
        "totalLevel": totalLevel,
        "totalXP": totalXP,
        "totalRank": rank,
        "skillXPs": skillXPArr,
        "skillRanks": skillRankArr
    };
};

module.exports = router;
