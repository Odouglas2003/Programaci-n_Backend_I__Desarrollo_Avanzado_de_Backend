const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Coder"); // Configuración limpia
        console.log("Connected to MongoDB: Coder");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error;
    }
};

module.exports = { connection };
