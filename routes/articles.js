const express = require('express')
const router = express.Router()
const auth = require("../auth.json")
const axios = require("../utils/axios");
const { authenticate, isModerator } = require("../utils/utils");


router.get('/list', (req, res) => {
    res.redirect('list/0/1');
})

router.get('/list/:type/:page', async (req, res) => {
    axios.get(auth.webAPI + `web?page=${req.params.page}&limit=6&type=${req.params.type}`)
        .then((response) => {
            res.render('pages/news-listing', { layout: "layout", page: req.params.page, type: req.params.type,
                webAPI: auth.webAPI, articles: response["data"], news: true });
        });
})

router.get("/admin", (req, res) => {
    authenticate(req, res);
});

router.get('/new', (req, res) => {
    res.render('articles/new', { layout: "layout-writenews", webAPI: auth.webAPI })
})

router.get('/edit/:id', async (req, res) => {
    axios.get(auth.webAPI + `web/get-article/${req.params.id}`)
        .then((response) => {
            res.render('articles/edit', { layout: "layout-writenews", isModerator: isModerator(req),
                webAPI: auth.webAPI, article: response["data"], editArticle: true });
        });
})

router.get('/:slug', async (req, res) => {
    axios.get(auth.webAPI + `web/get-article-slug/${req.params.slug}`)
        .then((response) => {
            if (response['data'] == '') res.redirect('/')
            res.render('articles/show', { article: response["data"], isModerator: isModerator(req), layout: "layout", news: true });
        });
})

module.exports = router
