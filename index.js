require('dotenv').config()

const cors = require("cors")
const express = require("express")
const app = express()

app.use(cors())
app.use(express.json())

const auth_route = require("./routes/auth-route")
app.use('/auth', auth_route)

const errorHandler = require("./middlewares/error")
app.use(errorHandler);

let port = process.env.PORT || 8000
app.listen(port, ()=> console.log("Server on Port :", port))
