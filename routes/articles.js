const express = require('express')
const Article = require('../utils/article')
const router = express.Router()
const auth = require("../auth.json")
function authenticate(req, res) {
    const reject = () => {
        res.setHeader("www-authenticate", "Basic");
        res.sendStatus(401);
    };

    const authorization = req.headers.authorization;

    if (!authorization) {
        return reject();
    }

    const [username, password] = Buffer.from(
        authorization.replace("Basic ", ""),
        "base64"
    )
        .toString()
        .split(":");

    if (!(username === auth.username && password === auth.password))
        return reject();
}

function isModerator(req) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return false;
    }
    const [username, password] = Buffer.from(
        authorization.replace("Basic ", ""),
        "base64"
    )
        .toString()
        .split(":");
    if (!(username === auth.username && password === auth.password))
        return false;
    return true;
}

router.get("/admin", (req, res) => {
    authenticate(req, res);
});

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article(), layout: "layout-writenews", webAPI: auth.webAPI, news: true })
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article, isModerator: isModerator(req), layout: "layout-writenews", webAPI: auth.webAPI, news: true })
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article, isModerator: isModerator(req), layout: "layout", news: true })
})

module.exports = router
