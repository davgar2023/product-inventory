class Product {
    constructor(id, name, category, price, quantity) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
    }
}

class ProductInventory {
    constructor() {
        this.products = [];
    }

    /**
     * Add a new product to the inventory.
     * 
     * @param {Product} product - The product to be added.
     */
    addProduct(product) {
        this.products.push(product);
    }

    /**
     * Update an existing product in the inventory.
     * 
     * @param {string} id - The ID of the product to update.
     * @param {Object} updatedProduct - The new product details.
     */
    updateProduct(id, updatedProduct) {
        this.products = this.products.map(product =>
            product.id === id ? { ...product, ...updatedProduct } : product
        );
    }

    /**
     * Delete a product from the inventory by ID.
     * 
     * @param {string} id - The ID of the product to delete.
     */
    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
    }

    /**
     * Search for products by name or ID.
     * 
     * @param {string} searchValue - The search string to filter products.
     * @returns {Array} - An array of products matching the search criteria.
     */
    searchProducts(searchValue) {
        const searchLower = searchValue.toLowerCase();
        return this.products.filter(product =>
            product.name.toLowerCase().includes(searchLower) || product.id.toLowerCase().includes(searchLower)
        );
    }

    /**
     * Sort products based on a specific key using the quicksort algorithm.
     * 
     * @param {string} key - The key by which to sort the products (e.g., 'name', 'price').
     * @returns {Array} - A sorted array of products.
     */
    sortProductsByKey(key) {
        return this.quickSort(this.products, key);
    }

    /**
     * QuickSort algorithm for sorting an array of products.
     * 
     * @param {Array} arr - The array of products to be sorted.
     * @param {string} key - The key by which to sort the products.
     * @returns {Array} - A sorted array of products.
     */
    quickSort(arr, key) {
        if (arr.length <= 1) {
            return arr;
        }

        let pivot = arr[arr.length - 1];
        let left = [];
        let right = [];

        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i][key] < pivot[key]) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        return [...this.quickSort(left, key), pivot, ...this.quickSort(right, key)];
    }
}

// Export the classes
module.exports = { Product, ProductInventory };