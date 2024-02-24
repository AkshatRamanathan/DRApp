const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // This references the 'User' model
    }
});

const BlogPost = mongoose.model('Post', BlogPostSchema);
module.exports = { BlogPost, BlogPostSchema };
