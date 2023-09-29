// 1 import carts model
const carts = require('../models/cartSchema')

//2 Add to cart collection

exports.addToCart = async (req, res) => {
    //get products details from the request

    //destructuring

    const { id, title, price, image, quantity } = req.body

    //logic - 
    try {
        // Check if the product is already in the cart 
        const products = await carts.findOne({ id })
        if (products) {

            // If product is present in the cart, update the quantity and price accordingly

            products.quantity += 1

            //Update the grandtotal 

            products.grandTotal = products.price * products.quantity

            // Save changes to mongodb

            products.save()

            //Send response back to the client

            res.status(200).json("Product details updated")
        }
        else {
            // If Product is not present in the cart,Add product to the cart
            const newProduct = new carts({
                id, title, price, image, quantity, grandTotal: price
            })

            //save new product details
            newProduct.save()

            //Send response back to client 
            res.status(200).json("Product added successfully")
        }
    }
    catch (error) {
        res.status(404).json(error)
    }
}


//Get cart product
exports.getCart = async (req, res) => {
    // Logic  * get cart products frm data base
    try {
        const allCart = await carts.find()
        res.status(200).json(allCart)

    }
    catch (error) {
        res.status(404).json(error)
    }
}

// delete a product from the cart

exports.deleteCartProduct = async (req, res) => {
    //get product id from request
    const { id } = req.params
    //  Remove product from Cart
    try {
        const removeProduct = await carts.deleteOne({ id }) // Product will get deleted
        if (removeProduct.deleteCount != 0) {

            // Get all remaining products from Cart
            const allproducts = await carts.find()
            res.status(200).json(allproducts) // response send back to client
        }
    }
    catch (error) {
        res.status(404).json(error)
    }
}

//Increment the cart product count

exports.incrementProductCount = async (req, res) => {
    // Find Product Id
    const { id } = req.params

    // If the product is already in the cart then quantity will be incremented by 1
    // then update the grand total
    try {
        const product = await carts.findOne({ id })
        if (product) {
            product.quantity += 1; // Quantity increments by 1
            product.grandTotal = product.price * product.quantity

            //Save changes to the db
            await product.save()
            //after the product has been saved , update the content into  clientcside
            const allCart = await carts.find()
            res.status(200).json(allCart)

        }
        else {
            res.status(401).json("Product not found")

        }
    }
    catch (error) {
        res.status(404).json(error)
    }
}
// Decrement Product 
exports.decrementProductCount = async (req, res) => {
    // Find Product Id
    const { id } = req.params

    // If the product is already in the cart then quantity will be decremented by 1
    // then update the grand total
    try {
        const product = await carts.findOne({ id })
        if (product) {
            product.quantity -= 1; // Quantity decrements by 1
            if (product.quantity == 0) {
                // remove the product from crt
                const removecartitems = await carts.deleteOne({ id })
                //Remaining products will be send back to client
                const allCart = await carts.find()
                res.status(200).json(allCart)


            }


            else {
                //Update grandtotal 
                product.grandTotal = product.price * product.quantity

                //Save changes to the db
                await product.save()
                //after the product has been saved , update the content into  clientcside
                const allCart = await carts.find()
                res.status(200).json(allCart)


            }
        }
        else {
            res.status(401).json("Product not found")

        }
    }
    catch (error) {
        res.status(404).json(error)
    }
}


