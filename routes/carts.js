const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const router = express.Router();

const cartsFile = path.join(__dirname, '../data/carrito.json');

// Helper functions
async function readCarts() {
    try {
        const data = await fs.readFile(cartsFile, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function writeCarts(carts) {
    await fs.writeFile(cartsFile, JSON.stringify(carts, null, 2));
}

// Routes
router.post('/', async (req, res) => {
    const carts = await readCarts();
    const newCart = {
        id: (carts.length + 1).toString(),
        products: []
    };

    carts.push(newCart);
    await writeCarts(carts);
    res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
    const carts = await readCarts();
    const cart = carts.find(c => c.id === req.params.cid);
    cart ? res.json(cart) : res.status(404).json({ error: 'Cart not found' });
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    const carts = await readCarts();
    const cart = carts.find(c => c.id === cid);

    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex(p => p.product === pid);

    if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }

    await writeCarts(carts);
    res.json(cart);
});

module.exports = router;
