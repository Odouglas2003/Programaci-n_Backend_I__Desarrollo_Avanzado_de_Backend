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
// const editColab = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updates = req.body;

//         // Validar si se enviaron datos para actualizar
//         if (!Object.keys(updates).length) {
//             return res.status(400).json({
//                 status: "error",
//                 message: "No se enviaron datos para actualizar",
//             });
//         }

//         // Buscar y actualizar el colaborador
//         const updatedColab = await Colab.findOneAndUpdate(
//             { id },
//             updates,
//             { new: true } // Retornar el documento actualizado
//         );

//         // Verificar si el colaborador existe
//         if (!updatedColab) {
//             return res.status(404).json({
//                 status: "error",
//                 message: "El colaborador no existe",
//             });
//         }

//         return res.status(200).json({
//             status: "success",
//             message: "Colaborador actualizado correctamente",
//             Colab: updatedColab,
//         });
//     } catch (error) {
//         console.error("Error al actualizar el colaborador:", error);
//         return res.status(500).json({
//             status: "error",
//             message: "Error en el servidor",
//         });
//     }
// };

// const Eliminar = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Buscar el colaborador por id
//         const colab = await Colab.findOne({ id });

//         // Verificar si el colaborador existe
//         if (!colab) {
//             return res.status(404).json({
//                 status: "error",
//                 message: "El colaborador no existe",
//             });
//         }

//         // Actualizar la fecha de eliminación
//         colab.delete_at = new Date();
//         const deletedColab = await colab.save();

//         console.log("Colaborador marcado como eliminado:", deletedColab);

//         return res.status(200).json({
//             status: "success",
//             message: "Colaborador marcado como eliminado correctamente",
//         });

//     } catch (error) {
//         console.error("Error al eliminar el colaborador:", error);
//         return res.status(500).json({
//             status: "error",
//             message: "Error en el servidor",
//         });
//     }
// };






// Exportar acciones
module.exports = {
    pruebaColab,
    register,
    // editColab,
    // Eliminar,
};
