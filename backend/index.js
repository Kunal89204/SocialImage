const express = require('express');
const path = require('path');
const app = require("./app");
const PORT = process.env.PORT;
const connectDB = require('./src/db/connectDB');
const userRoutes = require('./src/routes/user.routes');
const postRoutes = require('./src/routes/post.routes');
const followRoutes = require('./src/routes/follow.routes');
const likesRoutes = require('./src/routes/likes.routes');
const saveRoutes = require("./src/routes/saved.routes")
const commentRoutes = require("./src/routes/comment.routes")

connectDB();

// Serve static files from the src/uploads directory

app.use('/api/v1', userRoutes);
app.use('/api/v1', postRoutes);
app.use('/api/v1', followRoutes);
app.use('/api/v1', likesRoutes);
app.use('/api/v1', saveRoutes);
app.use('/api/v1', commentRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
