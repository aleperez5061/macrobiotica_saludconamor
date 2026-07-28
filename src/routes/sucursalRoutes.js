const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController');

// POST http://localhost:5000/api/sucursales (Crear)
router.post('/', sucursalController.create);

// GET http://localhost:5000/api/sucursales (Obtener todas)
router.get('/', sucursalController.getAll);

// GET http://localhost:5000/api/sucursales/:id (Obtener por ID)
router.get('/:id', sucursalController.getById);

// PUT http://localhost:5000/api/sucursales/:id (Actualizar)
router.put('/:id', sucursalController.update);

// DELETE http://localhost:5000/api/sucursales/:id (Eliminar)
router.delete('/:id', sucursalController.delete);

module.exports = router;
