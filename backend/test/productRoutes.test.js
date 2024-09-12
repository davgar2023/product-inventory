const request = require('supertest');
const express = require('express');
const { router, products } = require('../routes/productRoutes'); // The router file
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Use the product routes
app.use('/products', router);

// Mock the Product class
jest.mock('../models/product', () => {
    return jest.fn().mockImplementation((id, name, category, price, quantity) => {
        return { id, name, category, price, quantity };
    });
});

describe('Product Routes', () => {
   // let products = [];
   products.length = 0; // Clear the array
    beforeEach(() => {
        // Reset products array before each test
        products .push(
            { id: '1', name: 'Product 1', category: 'Category 1', price: 10, quantity: 100 },
            { id: '2', name: 'Product 2', category: 'Category 2', price: 20, quantity: 200 },
        );
    });

    test('GET /products should return all products', async () => {
        const response = await request(app).get('/products');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(2);
    });

    test('GET /products/:id should return a specific product', async () => {
        const response = await request(app).get('/products/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Product 1');
    });

    test('GET /products/:id should return 404 if product not found', async () => {
        const response = await request(app).get('/products/999');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Product not found');
    });

    test('POST /products should create a new product', async () => {
        const newProduct = { id: '3', name: 'Product 3', category: 'Category 3', price: 30, quantity: 300 };
        const response = await request(app).post('/products').send(newProduct);
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('Product 3');
    });

    test('PUT /products/:id should update an existing product', async () => {
        const updatedProduct = { name: 'Updated Product 1', category: 'Updated Category', price: 50, quantity: 500 };
        const response = await request(app).put('/products/1').send(updatedProduct);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Updated Product 1');
    });

    test('PUT /products/:id should return 404 if product not found', async () => {
        const updatedProduct = { name: 'Updated Product', category: 'Updated Category', price: 50, quantity: 500 };
        const response = await request(app).put('/products/999').send(updatedProduct);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Product not found');
    });

    test('DELETE /products/:id should delete a product', async () => {
        const response = await request(app).delete('/products/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Product deleted successfully');
    });

    test('DELETE /products/:id should return 404 if product not found', async () => {
        const response = await request(app).delete('/products/999');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Product not found');
    });
});
