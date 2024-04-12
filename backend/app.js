const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const bodyParser = require("body-parser") // Corrected typo here
const path = require("path")

const app = express();

app.use(cors())
dotenv.config();
app.use(bodyParser.json()); // Corrected typo here
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

module.exports = app;
