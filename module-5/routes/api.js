var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

function isAuthenticated(req, res, next) {
    if (req.method === "GET") {
        return next();
    }

    if (req.isAuthenticated()) {
        // user authenticated, continue
        return next();
    }

    // user not authenticated, redirect to login page
    return res.redirect('/#login');
}

//Register the authentication middleware
router.use('/posts', isAuthenticated);

router.route('/posts')
    // return all posts
    .get(function (req, res) {

        Post.find(function (err, data) {
            if (err) {
                return res.send(500, err);
            }

            return res.send(data);
        });

    })
    // add new post
    .post(function (req, res) {

        var post = new Post();
        post.text = req.body.text;
        post.created_by = req.body.created_by;
        post.save(function (err, post) {

            if (err) {
                return res.send(500, err);
            }

            return res.json(post);
        });

    });

router.route('/posts/:id')
    .get(function (req, res) {
        Post.findById(req.params.id, function (err, post) {
            if (err) {
                res.send(err);
            }
            res.json(post);
        });
    })
    .put(function (req, res) {
        Post.findById(req.params.id, function (err, post) {
            if (err) {
                res.send(err);
            }

            post.text = req.body.text;
            post.created_by = req.body.created_by;
            post.save(function (err, post) {

                if (err) {
                    return res.send(err);
                }

                return res.json(post);
            });
        });
    })
    .delete(function (req, res) {
        Post.remove({
            _id: req.params.id
        }, function (err) {
            if (err) {
                return res.send(err);
            }

            return res.json("post deleted!");
        });
    });

module.exports = router;
