let express = require("express");
const { post_controller } = require("../controllers/Post.contoller");
let posts_route = express.Router();

posts_route.post("/", post_controller.postPosts);
posts_route.post("/:post_id/like", post_controller.postLikeInc);
posts_route.post("/:post_id/unlike", post_controller.postLikeDec);
posts_route.get("/:post_id", post_controller.getPost);
posts_route.put("/:post_id", post_controller.updatePostContent);
posts_route.delete("/:post_id", post_controller.deletePost);

module.exports = { posts_route };

// GET /posts/{id}: Retrieve a post by id.
// POST /posts: Create a new post. The request should include the user_id.
// PUT /posts/{id}: Update a post's content by id.
// DELETE /posts/{id}: Delete a post by id.
// POST /posts/{id}/like: Increment the like count of a post by id.
// POST /posts/{id}/unlike: Decrement the like count of a post by id. The count
// should not go below 0.