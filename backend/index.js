const express = require('express');
const { connection } = require('./config/db');
const app = express();
app.use(express.json());
const cors = require("cors");
const { authentication } = require('./middlewares/authenticate');
const { posts_route } = require('./routes/Post.route');
const { users_route } = require('./routes/User.route');
const { analyics_route } = require('./routes/Analytics.route');
app.use(cors());

app.get("/", (req, res) => {
    res.send("Home page");
});

app.use("/users", users_route);
app.use("/analytics", analyics_route);
app.use("/posts", posts_route);


app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("Connection to DB successfully")
    }
    catch (err) {
        console.log("Error connecting to DB")
    }
    console.log("Listening on PORT", process.env.PORT)
})

