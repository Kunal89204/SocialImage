const express = require("express")
const app = express();
const cors = require("cors")
const bodyPraser = require("body-parser")
const dotenv = require('dotenv')

app.use(cors())
app.use(bodyPraser.json())
dotenv.config()

module.exports = app;