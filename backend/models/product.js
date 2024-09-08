/**
 * Class representing a product.
 */
class Product {
    /**
     * Create a product.
     * 
     * @param {string} id - The unique identifier for the product.
     * @param {string} name - The name of the product.
     * @param {string} category - The category of the product.
     * @param {number} price - The price of the product.
     * @param {number} quantity - The quantity in stock for the product.
     */
    constructor(id, name, category, price, quantity) {
        this.id = id;             // Unique product ID
        this.name = name;         // Product name
        this.category = category; // Category to which the product belongs
        this.price = price;       // Price of the product
        this.quantity = quantity; // Available quantity in stock
    }
}

module.exports = Product;
