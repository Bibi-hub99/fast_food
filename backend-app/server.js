const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./connectDB/connect")
const ProductRouter  = require("./routes/products")

connectDB()

const app = express()
app.use(cors())

const PORT = process.env.PORT || 8888

app.use("/products",ProductRouter)

app.listen(PORT,()=>{
    console.log('started listening on port 8888')
})