const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// POST http://localhost:5000/api/categorias (Crear)
router.post('/', categoriaController.create);

// GET http://localhost:5000/api/categorias (Obtener todas)
router.get('/', categoriaController.getAll);

// GET http://localhost:5000/api/categorias/:id (Obtener por ID)
router.get('/:id', categoriaController.getById);

// PUT http://localhost:5000/api/categorias/:id (Actualizar)
router.put('/:id', categoriaController.update);

// DELETE http://localhost:5000/api/categorias/:id (Eliminar)
router.delete('/:id', categoriaController.delete);

module.exports = router;