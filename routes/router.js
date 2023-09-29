// To define routes for client requests

///1 import express

const express = require('express');

//4 import product controller

const ProductController = require('../controllers/productController')

// import Wishlist controller
const WishlistController = require('../controllers/wishlistController')


// import cart controller

const cartController = require('../controllers/cartController')

///2 Using express create object for router class inorder to setup path 

const router = new express.Router()

///3 Use router object to resolve client request

// get all products api request
router.get('/products/all-products', ProductController.getAllProducts)


//6 Get particular product details
router.get('/products/view-products/:id', ProductController.viewProducts)

//7 Add a  new product to the Wishlist
router.post('/wishlists/add-to-wishlist', WishlistController.addToWishlist)

// View all wishlist items
router.get('/wishlists/view-all-wishlists', WishlistController.getWishlistItems)

//Delete a particular wishlist item

router.delete('/wishlists/delete-wishlist-product/:id', WishlistController.deleteProduct)

//Addto cart

router.post('/carts/add-to-cart', cartController.addToCart)

// Get cart Products
router.get('/carts/get-cart', cartController.getCart)


// Delete Cart Products
router.delete('/carts/delete-product/:id', cartController.deleteCartProduct)

// increment cart quantity
router.get('/carts/increment-product/:id', cartController.incrementProductCount)

// decrement cart quantity
router.get('/carts/decrement-product/:id', cartController.decrementProductCount)

// 5 Export routes
module.exports = router



