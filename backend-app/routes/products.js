const express = require("express")
const {findAllProducts,findSingleProduct,getByCategory,querySearch} = require("../controllers/products")

const Router = express.Router()

Router.get("/",findAllProducts)
Router.get("/search",querySearch)
Router.get("/categories",getByCategory)
Router.get("/product/:productID",findSingleProduct)

module.exports = Router