let express = require("express");
const { user_controller } = require("../controllers/User.controller");
let users_route = express.Router();

users_route.post("/", user_controller.signup);
users_route.post("/login", user_controller.login);
users_route.put("/:user_id", user_controller.updateUsers);
users_route.delete("/:user_id", user_controller.deleteUsers);

module.exports = { users_route };
