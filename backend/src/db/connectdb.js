const  mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('Database connected')
        })
        .catch((error) => {
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;

