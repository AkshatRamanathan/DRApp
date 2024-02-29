const { BlogPost } = require('../models/BlogPost');
const User = require('../models/User');
var CreatePostJOSN = require('../templates/createPost.json')

function create(req, res) {
    res.json(CreatePostJOSN)
}

async function getByUser(req, res) {
    const { user } = req.session;
    let userPosts = await BlogPost.find({ author: user._id });
    return res.json(userPosts);

}

async function edit(req, res) {

}

async function get(req, res) {
    const { id } = req.params;
    const post = await BlogPost.findById(id);
    let pageJson = JSON.parse(JSON.stringify(CreatePostJOSN));
    for (let item of pageJson.renderList) {
        if (item.id === 'title') {
            item.name = post.title;
            item.disabled = true;
        }
        if (item.id === 'content') {
            item.name = post.content;
            item.disabled = true;
        }
    }
    res.json(pageJson);
}

async function deletePost(req, res) {
    const { id } = req.params;
    await BlogPost.deleteOne({ _id: id });
    return res.json({ data: { redirect: "/dashboard/posts" } });
}
async function post(req, res) {
    const { title, content } = req.body;
    if (!title || !content) return res.redirect('/dashboard/create')
    const { user } = req.session;
    const newBlog = new BlogPost({ title, content, "likeCount": 0, author: user._id });
    await newBlog.save();
    const owner = await User.findById(user._id);
    owner.posts.push(newBlog._id);
    await owner.save();
    return res.redirect("/dashboard/posts")
}

module.exports = { get, create, post, getByUser, deletePost, edit }