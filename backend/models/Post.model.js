const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    content: { type: String, require: true, min: 1, max: 300 },
    likes: { type: Number, minimum: 0 },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, { timestamps: true })

const PostModel = mongoose.model("post", PostSchema)

module.exports = {
    PostModel
}
