var express = require('express');
var router = express.Router();

router.route('/posts')
    // return all posts
    .get(function(req, res) {
        res.send({message: 'Todo: return all posts'});
    })
    .post(function(req, res){
        res.send({message: 'Todo: Create new post'});
    });

module.exports = router;
