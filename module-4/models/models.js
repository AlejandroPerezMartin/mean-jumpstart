var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    created_at: { type: Date, default: Date.now }
});

var postSchema = mongoose.Schema({
    text: String,
    created_by: String,
    created_at: { type: Date, default: Date.now }
});

// declare model called User with schema userScheme
mongoose.model('User', userSchema);
mongoose.model('Post', postSchema);
