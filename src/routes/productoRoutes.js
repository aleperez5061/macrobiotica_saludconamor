const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// POST http://localhost:5000/api/productos (Crear)
router.post('/', productoController.create);

// GET http://localhost:5000/api/productos (Obtener todos)
router.get('/', productoController.getAll);

// GET http://localhost:5000/api/productos/:id (Obtener por ID)
router.get('/:id', productoController.getById);

// PUT http://localhost:5000/api/productos/:id (Actualizar)
router.put('/:id', productoController.update);

// DELETE http://localhost:5000/api/productos/:id (Eliminar)
router.delete('/:id', productoController.delete);

module.exports = router;
