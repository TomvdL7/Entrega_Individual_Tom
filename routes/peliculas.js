var express = require('express');
var router = express.Router();
var peliculasController= require("../controllers/peliculasController");

/* GET users listing. */
router.get('/crear',peliculasController.crear);

router.post('/crear',peliculasController.guardado);


router.get("/", peliculasController.listado);


router.get("/:id", peliculasController.detalle);

router.get("/editar/:id", peliculasController.editar);

router.post("/editar/:id", peliculasController.actualizar);


router.post("/borrar/:id", peliculasController.borrar)


module.exports = router;
