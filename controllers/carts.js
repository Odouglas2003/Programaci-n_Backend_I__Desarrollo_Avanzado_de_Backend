// Importar dependencias y modelos
const { connection } = require("../database/connection"); // Conexión
const Carrito = require("../models/carts");


// Acciones de prueba
const pruebaCarrito = async (req, res) => {
    try {
        // Asegurarte de que la conexión está activa
        await connection();

        // Obtener todos los usuarios
        const Carritos = await Carrito.find();

        // Enviar los usuarios como respuesta
        res.json(Carritos);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};

// Registro de usuarios
const register = async (req, res) => {
    try {
      const { items, total } = req.body;
  
      // Verificar si los datos están completos
      if (!items || !total || items.length === 0) {
        return res.status(400).json({
          status: "error",
          message: "Faltan datos por enviar",
        });
      }
  
      // Generar un ID único
      const id = Date.now(); // Usa la marca de tiempo como un identificador único
  
      // Crear un nuevo documento
      const newCarrito = new Carrito({
        id,
        items,
        total,
      });
  
      // Guardar en la base de datos
      const savedCarrito = await newCarrito.save();
  
      return res.status(200).json({
        status: "success",
        message: "Compra registrada correctamente",
        data: savedCarrito,
      });
    } catch (error) {
      console.error("Error al registrar la compra:", error);
      return res.status(500).json({
        status: "error",
        message: "Error en el servidor",
      });
    }
  };
  




// Exportar acciones
module.exports = {
    pruebaCarrito,
    register,
    // editCarrito,
    // Eliminar,
};
