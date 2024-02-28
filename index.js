require('dotenv').config()

const cors = require("cors")
const express = require("express")
const app = express()
const auth_route = require("./routes/auth-route")
const authenticate = require('./middlewares/authenticate')
const productRoute = require('./routes/product-route')

app.use(cors())
app.use(express.json())

app.use('/auth', auth_route)
app.use('/product', productRoute)



const errorHandler = require("./middlewares/error")
app.use(errorHandler);

let port = process.env.PORT || 8000
app.listen(port, ()=> console.log("Server on Port :", port))
