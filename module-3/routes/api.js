var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    if (req.method === 'GET') {
        return next();
    }

    if (!req.isAuthenticated()) {
        // user not authenticated, redirect to login page
        return res.redirect('/#login')
    }
});

router.route('/posts')
    // return all posts
    .get(function (req, res) {
        res.send({
            message: 'TODO: Return all posts'
        });
    })
    .post(function (req, res) {
        res.send({
            message: 'TODO: Create new post'
        });
    });

router.route('/posts/:id')
    .get(function (req, res) {
        res.send({
            message: 'TODO: Return post with ID ' + req.params.id
        });
    })
    .put(function (req, res) {
        res.send({
            message: 'TODO: Modify post with ID ' + req.params.id
        });
    })
    .delete(function (req, res) {
        res.send({
            message: 'TODO: Delete post with ID ' + req.params.id
        });
    });

module.exports = router;
