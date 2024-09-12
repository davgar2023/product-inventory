const { Product, ProductInventory } = require('./products.js');

// Initialize inventory
const inventory = new ProductInventory();

// Add a new product
const newProduct = new Product('1', 'Laptop', 'Electronics', 1200, 5);
inventory.addProduct(newProduct);

// Sort products by price
const sortedByPrice = inventory.sortProductsByKey('price');
console.log('Sorted by price:', sortedByPrice);

// Sort products by name
const sortedByName = inventory.sortProductsByKey('name');
console.log('Sorted by name:', sortedByName);