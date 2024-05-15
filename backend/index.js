const app = require("./app")
const PORT = process.env.PORT || 3000;
const connectDB = require("./src/db/connectdb");
const userRoute = require("./src/routes/user.routes");
const followRoute = require("./src/routes/follow.routes")
const postRoute = require("./src/routes/post.routes")
const likeRoute = require('./src/routes/likes.routes')

// connect to database
connectDB();



app.use("/user", userRoute);
app.use("/followapi", followRoute);
app.use("/post", postRoute)
app.use("/like", likeRoute)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})