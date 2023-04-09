const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, min: 1, max: 20, require: true },
    email: { type: String, require: true },
    bio: { type: String, max: 200 },
}, { timestamps: true })

const UserModel = mongoose.model("user", userSchema)

module.exports = {
    UserModel
}
