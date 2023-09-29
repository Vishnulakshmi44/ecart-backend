// Connectnode and Mongodb

// 1- import mongoose

const mongoose = require('mongoose');

//2 Add connection from .env
const DB = process.env.DATABASE

//3 Connection Code
mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.log('Database Connection Established');

}).catch((err) => {
    console.log(err);
})