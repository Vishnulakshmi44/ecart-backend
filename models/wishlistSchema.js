// 1 import mongoose
const mongoose = require('mongoose');

//2 Define schema for wishlist collection to store products
const wishlistSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },

    title: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,

    }
       
})

// 3 Create a model tO Store product

const wishlists =new mongoose.model('wishlists',wishlistSchema)

//a Export the model
module.exports = wishlists