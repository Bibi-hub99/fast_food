const express = require("express")
require("dotenv").config()
const connectDB = require("./connectDB/connect")

connectDB()

const app = express()

const PORT = process.env.PORT || 8888
app.listen(PORT,()=>{
    console.log('started listening on port 8888')
})