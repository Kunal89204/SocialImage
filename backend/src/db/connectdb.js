const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected", process.env.MONGODB_URI);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); 
    }
}

module.exports = connectdb;