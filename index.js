// 1 Automatically load .env file into the application 

require('dotenv').config()  // used to connect frontend and backend

//2 import express
const express = require('express')

// 6 import cors
const cors = require('cors')

//9 import connection.js
require('./connection')

// import router ********after products models controller
const router = require('./routes/router')

//3 Create an application using the express
const server = express()

//4 Define the port number
const PORT = 5000

//7 Use Cors in server app 
server.use(cors())
server.use(express.json())   /// json used to convert object data to array 
server.use(router)

//5 Run the Application
server.listen(PORT, () => {
    console.log('listening on port' + PORT);
})

//8 DEFINE ROUTES 
server.get('/', (req, res) => {
    res.status(200).json('ECommerce Service Started');
})