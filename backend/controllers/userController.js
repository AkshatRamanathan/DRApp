const { BlogPost } = require('../models/BlogPost');
const User = require('../models/User');
const Mongoose = require('mongoose');
var CreatePostJOSN = require('../templates/createPost.json')

async function get(req, res) {
    const { user } = req.session;
    let users = await User.find({}, { password: 0, posts: 0, __v: 0, follows: 0 }).lean();
    // wrap into a object, with columns and controlActions and data itself
    const responseData = {
        data: [...users],
        columns: Array.from(Object.keys(users[0]))
    }
    return res.json(responseData);

}

async function getSearch(req, res) {
    const { user } = req.session;
    let users = await User.find({ _id: { $ne: new Mongoose.Types.ObjectId(user._id) } }, { _id: 0, username: 1, email: 1 }).lean();
    // wrap into a object, with columns and controlActions and data itself
    const responseData = {
        data: [...users],
        columns: Array.from(Object.keys(users[0]))
    }
    return res.json(responseData);

}

async function deleteUser(req, res) {
    const { id } = req.params;
    await User.deleteOne({ _id: id });
    return res.json({ data: { redirect: "/dashboard/table/users" } });
}

async function followUser(req, res) {
    const { username } = req.params;
    const { user } = req.session;
    const dbUser = await User.findById(user._id);
    User.findOne({ username: username }).then(toFollow => {
        dbUser.follows.push(toFollow._id);
        dbUser.save();
    })
    return res.json({ data: { redirect: "/dashboard/feed" } });
}

module.exports = { get, delete: deleteUser, getSearch, followUser }