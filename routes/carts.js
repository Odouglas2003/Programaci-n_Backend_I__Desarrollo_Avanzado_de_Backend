const express = require("express");
const router = express.Router();
const CarritoController = require("../controllers/carts")

//definir rutas
router.get("/carrito",CarritoController.pruebaCarrito);

router.post("/register", CarritoController.register);

// router.put("/editar/:id", ColaController.editColab); 

// router.post("/eliminar/:id", ColaController.Eliminar);



//exportar ruter
module.exports = router;