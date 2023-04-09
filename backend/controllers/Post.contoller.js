const { PostModel } = require("../models/Post.model");

require("dotenv").config()

let post_controller = {

    //GET POST BY ID
    getPost: async (req, res) => {
        try {
            let { post_id } = req.params;
            console.log(post_id);
            let post = await PostModel.find({ _id: post_id });
            res.send({ status: 200, "post": post });
        } catch {
            res.send({ status: 500, "err": "can't send data right now " });
        }
    },

    //POST A POST  
    postPosts: async (req, res) => {
        try {
            let data = req.body;
            let new_post = new PostModel({
                ...data
            });
            await new_post.save();
            let posts = await PostModel.find();
            res.send({ status: 200, "msg": "Post Added", "posts": posts, new_Post: new_post })
        } catch (err) {
            res.send({ status: 500, "err": "somthing went wrong" })
        }
    },

    //DELETE THE POST BY ID
    deletePost: async (req, res) => {
        let { post_id } = req.params;
        try {
            if (post_id) {
                let deleted_lecture = await PostModel.findOneAndDelete({ _id: post_id });
                let posts = await PostModel.find();

                res.send({ status: 200, "msg": "Post Deleted", "posts": posts, "deleted_lecture": deleted_lecture });
            }
        } catch {
            res.send({ status: 500, "err": "can't send data right now " });
        }
    },

    //PUT THE POST BY ID
    updatePostContent: async (req, res) => {
        try {
            let { post_id } = req.params;
            let { content } = req.body;
            if (post_id) {
                let updated_post = await PostModel.findOneAndUpdate({ _id: post_id }, { content: content }, { returnOriginal: false });
                console.log(updated_post)
                let posts = await PostModel.find();

                res.send({ status: 200, "msg": "User Updated", "posts": posts, "updated_post": updated_post });
            }
        } catch {
            res.send({ status: 500, "err": "can't send data right now " });
        }
    },

    //POST FOR LIKE INCREMENT
    postLikeInc: async (req, res) => {
        try {
            let { post_id } = req.params;
            if (post_id) {
                let liked_post = await PostModel.findOneAndUpdate({ _id: post_id }, { $inc: { likes: 1 } }, { returnOriginal: false });
                console.log(liked_post)
                let Posts = await PostModel.find();
                res.send({ status: 200, "msg": "Glad You Like this post!", "liked_post": liked_post, "Posts": Posts });
            }
        } catch {
            res.send({ status: 500, "err": "can't send data right now " });
        }
    },
    //POST FOR LIKE DECREMENT
    postLikeDec: async (req, res) => {
        try {
            let { post_id } = req.params;
            if (post_id) {
                let unliked_post = await PostModel.findOneAndUpdate({ _id: post_id }, { $inc: { likes: -1 } }, { returnOriginal: false });
                let Posts = await PostModel.find();
                res.send({ status: 200, "msg": "Thanks for sharing your opinion!", "unliked_post": unliked_post, "Posts": Posts });
            }
        } catch {
            res.send({ status: 500, "err": "can't send data right now " });
        }
    },

    //GET ALL POST
    getAllPosts: async (req, res) => {
        try {
            let Posts = await PostModel.find();
            res.send({ status: 200, "msg": "Success!", "posts": Posts });
        } catch {
            res.send({ status: 500, "err": "can't send data right now " });
        }
    },

    //GET TOP FIVE MOST LIKED POST
    getTopFiveMostLikedPost: async (req, res) => {
        try {
            let most_liked_posts = await PostModel.find().sort({ likes: -1 }).limit(5);
            console.log(most_liked_posts);
            res.send({ status: 200, "msg": "Success!", "most_liked_posts": most_liked_posts });
        } catch {
            res.send({ status: 500, "err": "can't send data right now " });
        }
    },
}
module.exports = { post_controller };