const express = require("express");
const router = express.Router();
const ColaController = require("../controllers/products")

//definir rutas
router.get("/Producto",ColaController.pruebaColab);

// router.post("/register", ColaController.register);

// router.put("/editar/:id", ColaController.editColab); 

// router.post("/eliminar/:id", ColaController.Eliminar);



//exportar ruter
module.exports = router;