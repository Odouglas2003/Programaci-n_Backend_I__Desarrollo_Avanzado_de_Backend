const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    id: { type: Number, required: true, unique: true }, // ID único del producto
    name: { type: String, required: true }, // Nombre del producto
    description: { type: String, required: true }, // Descripción
    price: { type: Number, required: true }, // Precio del producto
    stock: { type: Number, required: true }, // Cantidad en stock
    image: { type: String, required: true }, // URL de la imagen
}); 

// Exportar el modelo
module.exports = model("Product", productSchema, "Producto");
