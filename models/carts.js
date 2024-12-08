const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  id: { type: Number, required: true, unique: true }, // ID único del producto
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
});

// Exportar el modelo
module.exports = model("Carrito", productSchema, "Carrito");
