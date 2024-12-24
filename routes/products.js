const express = require("express");
const router = express.Router();
const ColaController = require("../controllers/products")

//definir rutas
router.get("/Producto",ColaController.pruebaColab);

router.post("/register", ColaController.register);

router.get("/ordenar", ColaController.MayoraMenor);

router.put("/editar/:id", ColaController.editColab); 

router.delete("/eliminar/:id", ColaController.Eliminar);



//exportar ruter
module.exports = router;