// Product Class
class Product {
    constructor(id, name, category, price, quantity) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
    }
}

// ProductInventory Class
class ProductInventory {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
        this.renderProductList();
    }

    updateProduct(id, updatedProduct) {
        this.products = this.products.map(product =>
            product.id === id ? { ...product, ...updatedProduct } : product
        );
        this.renderProductList();
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.renderProductList();
    }

    searchProducts(searchValue) {
        const searchLower = searchValue.toLowerCase();
        return this.products.filter(product =>
            product.name.toLowerCase().includes(searchLower) || product.id.toLowerCase().includes(searchLower)
        );
    }

    sortProducts(key) {
        this.products = this.quickSort(this.products, key);
        this.renderProductList();
    }

    filterProductById(id) {
        return this.products.filter(product => product.id === id);
    }

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

    renderProductList(products = this.products) {
        const productTable = document.getElementById('productTable');
        productTable.innerHTML = '';

        products.forEach((product) => {
            const row = `<tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${product.quantity}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="inventory.editProduct('${product.id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="inventory.deleteProduct('${product.id}')">Delete</button>
                </td>
            </tr>`;
            productTable.insertAdjacentHTML('beforeend', row);
        });
    }

    editProduct(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            document.getElementById('productID').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('category').value = product.category;
            document.getElementById('price').value = product.price;
            document.getElementById('quantity').value = product.quantity;

            this.deleteProduct(id);
        }
    }
}

// Instantiate ProductInventory
const inventory = new ProductInventory();

// Handle form submission to add product
document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('productID').value;
    const name = document.getElementById('productName').value;
    const category = document.getElementById('category').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    const product = new Product(id, name, category, price, quantity);
    inventory.addProduct(product);

    this.reset();
});

// Handle search
document.getElementById('searchButton').addEventListener('click', function() {
    const searchValue = document.getElementById('searchInput').value;
    const filteredProducts = inventory.searchProducts(searchValue);
    inventory.renderProductList(filteredProducts);
});

// Handle sorting
document.getElementById('sortByName').addEventListener('click', function() {
    inventory.sortProducts('name');
});

document.getElementById('sortByPrice').addEventListener('click', function() {
    inventory.sortProducts('price');
});

document.getElementById('sortByCategory').addEventListener('click', function() {
    inventory.sortProducts('category');
});

// Handle filtering by ID
document.getElementById('filterByID').addEventListener('click', function() {
    const searchValue = document.getElementById('searchInput').value;
    const filteredProducts = inventory.filterProductById(searchValue);
    inventory.renderProductList(filteredProducts);
});
