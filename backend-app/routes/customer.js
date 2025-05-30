const express = require("express")
const {addOrder,getAllOrders,deleteOrder} = require("../controllers/customer")

const Router = express.Router()

Router.get('/orders',getAllOrders)

Router.post('/purchase',addOrder)
Router.delete("/orders/:orderID",deleteOrder)

module.exports = Router