const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

// POST http://localhost:5000/api/roles (Crear)
router.post('/', rolController.create);

// GET http://localhost:5000/api/roles (Obtener todos)
router.get('/', rolController.getAll);

// GET http://localhost:5000/api/roles/:id (Obtener por ID)
router.get('/:id', rolController.getById);

// PUT http://localhost:5000/api/roles/:id (Actualizar)
router.put('/:id', rolController.update);

// DELETE http://localhost:5000/api/roles/:id (Eliminar)
router.delete('/:id', rolController.delete);

module.exports = router;
