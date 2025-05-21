const express = require("express")
const {findAllProducts,findSingleProduct,getByCategory} = require("../controllers/products")

const Router = express.Router()

Router.get("/",findAllProducts)
Router.get("/categories",getByCategory)
Router.get("/product/:productID",findSingleProduct)

module.exports = Router