const { UserModel } = require("../models/User.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { PostModel } = require("../models/Post.model");
require("dotenv").config()

let user_controller = {

    //SIGNUP USER
    signup: async (req, res) => {
        try {
            const data = req.body;
            if (data.email && data.name) {
                let user = await UserModel.findOne({ email: data.email });
                if (user) {
                    res.send({
                        "err": "User Already Registered",
                        "status": 404,
                    });
                } else {
                    let user = {
                        ...data
                    };
                    const new_user = new UserModel(user);
                    await new_user.save();
                    const users = await UserModel.find()
                    res.send({
                        "msg": "Registered Successfully",
                        "status": 200,
                        "users": users
                    });
                }

            } else {
                res.send({ "err": "Please fill All Details" });
            }
        } catch (err) {
            res.send({ "status": 500, "err": "User Register Failed" });
        }
    },

    //LOGIN USER
    login: async (req, res) => {
        let { email, password } = req.body;
        let user = await UserModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ email }, process.env.JWT_SECRET);
                    res.send({ status: 200, "token": token, "user": user, "msg": "Login Successfull !" });
                } else {
                    res.send({ status: 500, "err": "Wrong Credentials" });
                }
            });
        } else {
            res.send({ status: 500, "err": "Signup First" });
        }
    },

    //GET USER BY ID
    getUser: async (req, res) => {
        try {
            let { user_id } = req.params;
            console.log(user_id);
            let user = await UserModel.find({ _id: user_id });
            res.send({ status: 200, "User": user });
        } catch {
            res.send({ status: 500, "err": "can't send data right now " });
        }
    },

    //UPDATE USER BY ID
    updateUsers: async (req, res) => {
        try {
            let { user_id } = req.params;
            console.log(user_id, req.body)
            let data = req.body;
            if (user_id) {
                let updated_user = await UserModel.findOneAndUpdate({ _id: user_id }, data);
                let users = await UserModel.find();
                res.send({ status: 200, "msg": "User Updated", "updated_user": updated_user, "users": users });
            }
        } catch {
            res.send({ status: 500, "err": "can't send data right now " });
        }
    },

    //DELETE USER
    deleteUsers: async (req, res) => {
        try {
            let { user_id } = req.params;
            console.log(user_id)
            if (user_id) {
                let deleted_user = await UserModel.findOneAndDelete({ _id: user_id });
                let users = await UserModel.find();

                let deleted_post = await PostModel.findOneAndDelete({ user_id: user_id })
                res.send({ status: 200, "msg": "User Deleted", "deleted_user": deleted_user, "users": users });
            }
        } catch {
            res.send({ status: 500, "err": "can't send data right now " });
        }
    },

    //GET ALL USER 
    getAllUsers: async (req, res) => {
        try {
            let users = await UserModel.find();
            res.send({ status: 200, "users": users });
        } catch {
            res.send({ status: 500, "err": "can't send data right now " });
        }
    },

    //GET TOP_ACTIVE USERS
    getTopActiveUsers: async (req, res) => {
        try {

            let users = await UserModel.find();
            let topActive = [];
            await Promise.all(
                users.map(async (elem) => {
                    let count = await PostModel.countDocuments({ user_id: elem._id });
                    topActive.push({ count: count, user: elem });
                })
            );
            topActive.sort((a, b) => b.count - a.count);
            console.log(topActive);
            res.send({ status: 200, "users": topActive });
        } catch {
            res.send({ status: 500, "err": "can't send data right now " });
        }
    },
}

module.exports = { user_controller };