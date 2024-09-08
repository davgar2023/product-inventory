const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Assuming Product is a class/model
const { quickSort } = require('../utils/sort'); // Importing the quickSort function

let products = []; // In-memory storage for simplicity

/**
 * @route GET /products
 * @description Get all products, with optional sorting by a specified key
 * @query {string} sortBy - The key by which to sort the products
 * @returns {Array} - Array of products, optionally sorted by the specified key
 */
router.get('/', (req, res) => {
    const sortKey = req.query.sortBy; // Get sorting key from query params
    let sortedProducts = products;
    if (sortKey) {
        sortedProducts = quickSort(products, sortKey); // Sort products if sortBy key is provided
    }
    res.json(sortedProducts); // Return sorted or unsorted products
});

/**
 * @route GET /products/:id
 * @description Get a single product by its ID
 * @param {string} id - The ID of the product
 * @returns {Object} - The product with the specified ID, or an error if not found
 */
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id); // Find product by ID
    if (product) {
        res.json(product); // Return the found product
    } else {
        res.status(404).json({ message: 'Product not found' }); // Return 404 if not found
    }
});

/**
 * @route POST /products
 * @description Create a new product and add it to the products array
 * @body {string} id - The product ID
 * @body {string} name - The name of the product
 * @body {string} category - The category of the product
 * @body {number} price - The price of the product
 * @body {number} quantity - The quantity of the product in stock
 * @returns {Object} - The newly created product
 */
router.post('/', (req, res) => {
    const { id, name, category, price, quantity } = req.body; // Destructure the product info from the request body
    const newProduct = new Product(id, name, category, price, quantity); // Create new product instance
    products.push(newProduct); // Add new product to products array
    res.status(201).json(newProduct); // Return the newly created product with 201 status
});

/**
 * @route PUT /products/:id
 * @description Update an existing product by its ID
 * @param {string} id - The ID of the product to update
 * @body {string} name - The new name of the product
 * @body {string} category - The new category of the product
 * @body {number} price - The new price of the product
 * @body {number} quantity - The new quantity of the product
 * @returns {Object} - The updated product, or an error if not found
 */
router.put('/:id', (req, res) => {
    const { name, category, price, quantity } = req.body; // Destructure updated product info from request body
    const productIndex = products.findIndex(p => p.id === req.params.id); // Find the index of the product by ID

    if (productIndex !== -1) {
        // If product is found, update it
        products[productIndex] = { id: req.params.id, name, category, price, quantity };
        res.json(products[productIndex]); // Return the updated product
    } else {
        res.status(404).json({ message: 'Product not found' }); // Return 404 if not found
    }
});

/**
 * @route DELETE /products/:id
 * @description Delete a product by its ID
 * @param {string} id - The ID of the product to delete
 * @returns {Object} - A success message if deleted, or an error if not found
 */
router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === req.params.id); // Find the index of the product by ID

    if (productIndex !== -1) {
        products.splice(productIndex, 1); // Remove the product from the array
        res.json({ message: 'Product deleted successfully' }); // Return success message
    } else {
        res.status(404).json({ message: 'Product not found' }); // Return 404 if not found
    }
});

module.exports = router;
