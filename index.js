const express = require('express');
const app = express();
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Server listening
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
