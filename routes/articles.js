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
    res.render('articles/new', { article: new Article(), layout: "layout-writenews" })
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article, isModerator: isModerator(req), layout: "layout-writenews" })
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article, isModerator: isModerator(req), layout: "layout-writenews" })
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try {
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (e) {
            console.log(e)
            res.render(`articles/${path}`, { article: article, isModerator: isModerator(req), layout: "layout-writenews" })
        }
    }
}

// router.get("/admin", (req, res) => {
//     authenticate(req, res);
// });
//
// router.get('/edit/:id', async (req, res) => {
//     const article = await Article.findById(req.params.id)
//     res.render('pages/write-news/edit', { article: article, isModerator: isModerator(req),
//         uploadToken: auth.uploadToken, layout: 'layout-writenews', news: true })
// })
//
// router.get('/:slug', async (req, res) => {
//     const article = await Article.findOne({ slug: req.params.slug })
//     if (article == null) res.redirect('/')
//     res.render('pages/write-news/show', { article: article, isModerator: isModerator(req), layout: 'layout-writenews', news: true })
// })
//
// router.get('/', async (req, res) => {
//     const articles = await Article.find().sort({ createdAt: 'desc' });
//     res.render('pages/write-news/index', { articles: articles, isModerator: isModerator(req), layout: 'layout-writenews', news: true });
// })
//
//
//
// router.get('/new', (req, res) => {
//     res.render('pages/write-news/new', { article: new Article(), isModerator: isModerator(req),
//         uploadToken: auth.uploadToken, layout: 'layout-writenews', news: true })
// })
//
// router.post('/', async (req, res, next) => {
//     req.article = new Article()
//     next()
// }, saveArticleAndRedirect('new'))
//
// router.put('/:id', async (req, res, next) => {
//     console.log("putted")
//     req.article = await Article.findById(req.params.id)
//     next()
// }, saveArticleAndRedirect('edit'))
//
// router.delete('/:id', async (req, res) => {
//     await Article.findByIdAndDelete(req.params.id)
//     res.redirect('/')
// })
//
// function saveArticleAndRedirect(path) {
//     return async (req, res) => {
//         let article = req.article
//         article.title = req.body.title
//         article.description = req.body.description
//         article.markdown = req.body.markdown
//         try {
//             article = await article.save()
//             res.redirect('/news-posts/'+ article.slug)
//         } catch (e) {
//             res.render('pages/write-news/' + path, { article: article, layout: 'layout', news: true })
//         }
//     }
// }

module.exports = router
