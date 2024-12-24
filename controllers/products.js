// Importar dependencias y modelos
const { connection } = require("../database/connection"); // Conexión
const Colab = require("../models/products.js");


// Acciones de prueba
const pruebaColab = async (req, res) => {
    try {
        // Asegurarte de que la conexión está activa
        await connection();

        // Obtener todos los usuarios
        const Colabs = await Colab.find();

        // Enviar los usuarios como respuesta
        res.json(Colabs);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};
const MayoraMenor = async (req, res) => {
    try {
        // Depurar para ver el body recibido
        console.log("Cuerpo recibido:", req.body);

        // Obtener el valor de 'order' desde el cuerpo
        const { order } = req.body;

        // Convertir el valor de 'order' a número
        const parsedOrder = parseInt(order);

        // Validar el valor
        if (isNaN(parsedOrder) || ![1, 0, 2].includes(parsedOrder)) {
            return res.status(400).json({
                message: "Orden inválido. Usa 1 (ascendente), 0 (descendente), o 2 (sin ordenar)",
            });
        }

        let Colabs;

        // Ordenar según el valor de 'parsedOrder'
        if (parsedOrder === 1) {
            // Ordenar de menor a mayor
            Colabs = await Colab.find().sort({ price: 1 });
        } else if (parsedOrder === 0) {
            // Ordenar de mayor a menor
            Colabs = await Colab.find().sort({ price: -1 });
        } else {
            // Sin ordenar
            Colabs = await Colab.find();
        }

        // Responder con los resultados
        res.json(Colabs);
    } catch (error) {
        console.error("Error al obtener colaboradores:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
// Registro de usuarios
const register = async (req, res) => {
    try {
        const params = req.body;

        if (
            !params.id ||
            !params.name ||
            !params.description ||
            !params.price ||
            !params.stock ||
            !params.image 
        ) {
            return res.status(400).json({
                status: "error",
                message: "FALTAN DATOS POR ENVIAR",
            });
        }

        const existingColab = await Colab.findOne({ id: params.id });
        if (existingColab) {
            return res.status(400).json({
                status: "error",
                message: "El Id ya existe",
            });
        }

        console.log("Datos antes de guardar:", params);

        const newColab = new Colab({
            id: params.id,
            name: params.name,
            description: params.description,
            price: params.price,
            stock: params.stock,
            image: params.image,
        });

        const savedColab = await newColab.save();

        console.log("Usuario guardado correctamente:", savedColab);

        return res.status(200).json({
            status: "success",
            message: "Usuario registrado correctamente",
            Colab: savedColab,
        });
    } catch (error) {
        console.error("Error en el registro:", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
        });
    }
};

// Editar un colaborador
const editColab = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Validar si se enviaron datos para actualizar
        if (!Object.keys(updates).length) {
            return res.status(400).json({
                status: "error",
                message: "No se enviaron datos para actualizar",
            });
        }

        // Buscar y actualizar el colaborador
        const updatedColab = await Colab.findOneAndUpdate(
            { id },
            updates,
            { new: true } // Retornar el documento actualizado
        );

        // Verificar si el colaborador existe
        if (!updatedColab) {
            return res.status(404).json({
                status: "error",
                message: "El colaborador no existe",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Colaborador actualizado correctamente",
            Colab: updatedColab,
        });
    } catch (error) {
        console.error("Error al actualizar el colaborador:", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
        });
    }
};

const Eliminar = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar y eliminar directamente el colaborador por su ID
        const deletedColab = await Colab.findOneAndDelete({ id });

        // Verificar si se encontró y eliminó
        if (!deletedColab) {
            return res.status(404).json({
                status: "error",
                message: "El colaborador no existe",
            });
        }

        console.log("Colaborador eliminado:", deletedColab);

        return res.status(200).json({
            status: "success",
            message: "Colaborador eliminado correctamente",
        });

    } catch (error) {
        console.error("Error al eliminar el colaborador:", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
        });
    }
};


// Exportar acciones
module.exports = {
    pruebaColab,
    register,
    editColab,
    Eliminar,
    MayoraMenor,

};
