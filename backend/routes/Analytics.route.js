let express = require("express");
const { post_controller } = require("../controllers/Post.contoller");
const { user_controller } = require("../controllers/User.controller");
let analyics_route = express.Router();

analyics_route.get("/users/", user_controller.getAllUsers);
analyics_route.get("/users/top-active", user_controller.getTopActiveUsers);
analyics_route.get("/posts/", post_controller.getAllPosts);
analyics_route.get("/posts/top-liked", post_controller.getTopFiveMostLikedPost);

module.exports = { analyics_route };

