// Logic for Wishlist

//1 Import wishlists model
const wishlists = require('../models/wishlistSchema')

//2 Logic for adding wishlist
exports.addToWishlist = async (req, res) => {
    //get product details
    //req.body={
    //id:9858,
    //title:"err",
    //price:'859'
    //}
    //DESTRUCTURING
    const { id, title, price, image } = req.body;
    //logic
    try {
        //check if productis already available in wishlists
        const item = await wishlists.findOne({ id })
        if (item) {
            res.status(403).json("Product is already in the wishlist")
        }
        else {
            // Add new product to the wishlist
            const newProduct = new wishlists({ id, title, price, image })
            // To store the new product in the wishlists
            await newProduct.save()

            // Send response back to the client
            res.status(200).json("Product added Successfully")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

// 3 get all wishlist products 
exports.getWishlistItems = async (req, res) => {
    //Logic
    try {
        const allWishlist = await wishlists.find()
        res.status(200).json(allWishlist) // Wishlists product details
    }
    catch (error) {
        res.status(404).json(error)
    }
}

//Logic for deleting a particular product

exports.deleteProduct = async (req, res) => {

    //Get id from request
    //Fetch Remainig products
    //DESTRUCTURING

    //Get id from path parameter

    const { id } = req.params
    try {
        const removeProduct = await wishlists.deleteOne({ id })
        //get all wishlists products remaining after deletion of particular product
        if (removeProduct) {
            const allItems = await wishlists.find()
            res.status(200).json(allItems)
        }
    }
    catch (error) {
        res.status(404).json(error)
    }
}
