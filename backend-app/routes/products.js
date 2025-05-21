const express = require("express")
const {findAllProducts,findSingleProduct} = require("../controllers/products")

const Router = express.Router()

Router.get("/",findAllProducts)
Router.get("/product/:productID",findSingleProduct)

module.exports = Router