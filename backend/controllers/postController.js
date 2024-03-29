const { BlogPost } = require('../models/BlogPost');
const User = require('../models/User');
var CreatePostJOSN = require('../templates/createPost.json')
const mongoose = require('mongoose');

function create(req, res) {
    res.json(CreatePostJOSN)
}

async function getSelfPosts(req, res) {
    const { user } = req.session;
    let userPosts = await BlogPost.find({ author: user._id }, { __v: 0, author: 0, content: 0 }).lean();
    // wrap into a object, with columds and controlActions and data itself
    const responseData = {
        data: [...userPosts],
        columns: Array.from(Object.keys(userPosts[0]))
    }
    return res.json(responseData);

}

async function getFeed(req, res) {
    const { user } = req.session;
    const feedPosts = await BlogPost.aggregate([
        {
            $match: {
                author: { $in: user.follows.map(follow => new mongoose.Types.ObjectId(follow)) } // Exclude posts authored by the current user
            }
        },
        {
            $lookup: {
                from: "users", // Assuming your User schema is stored in a collection named "users"
                localField: "author", // Field in the BlogPost collection
                foreignField: "_id", // Field in the User collection
                as: "authorInfo" //temp var name
            }
        },
        {
            $unwind: "$authorInfo"
        },
        {
            $project: {
                _id: 1, // Include BlogPost _id
                title: 1, // Include BlogPost title
                content: 1, // Include BlogPost content,
                likeCount: 1,
                author: "$authorInfo.username", // Replace author ObjectId with username
                // Include other fields if needed
            }
        }
    ]);
    res.json(feedPosts);
}

async function edit(req, res) {
    //save edited id
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title || !content) return res.redirect(`/dashboard/posts/${id}?enable=true`);
    await BlogPost.findByIdAndUpdate(id, req.body);
    return res.redirect("/dashboard/table/posts")
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
        if (item.type === 'button') {
            item.display = "none";
        }
    }
    res.json(pageJson);
}

async function deletePost(req, res) {
    const { id } = req.params;
    await BlogPost.deleteOne({ _id: id });
    return res.json({ data: { redirect: "/dashboard/table/posts" } });
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
    return res.redirect("/dashboard/table/posts")
}

async function likePost(req, res) {
    const { id } = req.params;
    const post = await BlogPost.findById(id);
    post.likeCount += 1;
    await post.save();
}

module.exports = { get, create, post, getSelfPosts, deletePost, edit, getFeed, likePost }