const { BlogPost } = require('../models/BlogPost');
const User = require('../models/User');
var CreatePostJOSN = require('../templates/createPost.json')

async function get(req, res) {
    const { user } = req.session;
    let users = await User.find({},{password:0, posts: 0, __v: 0}).lean();
    // wrap into a object, with columds and controlActions and data itself
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

module.exports = { get, delete: deleteUser }