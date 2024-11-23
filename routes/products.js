const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const router = express.Router();

const productsFile = path.join(__dirname, '../data/productos.json');

// Helper function to read and write JSON files
async function readProducts() {
    try {
        const data = await fs.readFile(productsFile, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function writeProducts(products) {
    await fs.writeFile(productsFile, JSON.stringify(products, null, 2));
}

// Routes
router.get('/', async (req, res) => {
    const products = await readProducts();
    const { limit } = req.query;
    const result = limit ? products.slice(0, Number(limit)) : products;
    res.json(result);
});

router.get('/:pid', async (req, res) => {
    const products = await readProducts();
    const product = products.find(p => p.id === req.params.pid);
    product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
});

router.post('/', async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails, status = true } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const products = await readProducts();
    const newProduct = {
        id: (products.length + 1).toString(),
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails: thumbnails || [],
        status
    };

    products.push(newProduct);
    await writeProducts(products);
    res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
    const updates = req.body;
    delete updates.id; // Ensure id is not updated

    const products = await readProducts();
    const index = products.findIndex(p => p.id === req.params.pid);

    if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    products[index] = { ...products[index], ...updates };
    await writeProducts(products);
    res.json(products[index]);
});

router.delete('/:pid', async (req, res) => {
    const products = await readProducts();
    const updatedProducts = products.filter(p => p.id !== req.params.pid);

    if (products.length === updatedProducts.length) {
        return res.status(404).json({ error: 'Product not found' });
    }

    await writeProducts(updatedProducts);
    res.json({ message: 'Product deleted successfully' });
});

module.exports = router;
