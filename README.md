# Product Inventory System

This project is a simple **Product Inventory System** that allows you to manage products using Node.js. The system supports adding, updating, deleting, searching, and sorting products based on various properties like `name`, `price`, or `category`. It implements the **Quick Sort** algorithm for sorting the products.

## Features

- **Add Products**: Add new products to the inventory.
- **Update Products**: Modify details of an existing product by its ID.
- **Delete Products**: Remove a product from the inventory by its ID.
- **Search Products**: Search for products by `name` or `ID`.
- **Sort Products**: Sort products by any key (e.g., `name`, `price`, `category`) using the **Quick Sort** algorithm.

## Project Structure

product-inventory/
backend/
        ├── models/
        │   └── product.js           # Product class representing a product
        ├── utils/
        │   └── sort.js              # QuickSort algorithm utility function
        ├── routes/
        │   └── productRoutes.js      # Express.js routes for handling product operations
        ├── index.js                 # Entry point for starting the Express server
        ├── package.json             # Node.js project configuration and dependencies
        └── README.md                # Project documentation




## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/davgar2023/product-inventory.git
    ```
2. **Navigate into the project directory**:
    ```bash
    cd product-inventory
    ```

3. **Install dependencies**:
    This project uses Node.js. Install the necessary dependencies by running:
    ```bash
    npm install
    ```
     ```bash
    npm start
     ```
## Usage

### Adding a Product
To add a product, create an instance of the `Product` class and use the `addProduct` method from `ProductInventory`.

    ```js s products.js 

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

// backend

     a) GET All Products
        URL: http://localhost:3000/products
        Method: GET
        Description: This will fetch all products from the in-memory products array.
     b) GET Single Product by ID
        URL: http://localhost:3000/products/1
        Method: GET
        Description: Fetch a specific product by its id (replace 1 with the actual ID).
     c) POST Create a Product
        URL: http://localhost:3000/products
        Method: POST


npm test

 PASS  backend/test/productRoutes.test.js
  Product Routes
    ✓ GET /products should return all products (58 ms)
    ✓ GET /products/:id should return a specific product (3 ms)
    ✓ GET /products/:id should return 404 if product not found (2 ms)
    ✓ POST /products should create a new product (17 ms)
    ✓ PUT /products/:id should update an existing product (4 ms)
    ✓ PUT /products/:id should return 404 if product not found (5 ms)
    ✓ DELETE /products/:id should delete a product (3 ms)
    ✓ DELETE /products/:id should return 404 if product not found (4 ms)

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total


// run HTML

you can test the app from index.html
