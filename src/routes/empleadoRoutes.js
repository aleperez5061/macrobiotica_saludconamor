const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

// POST http://localhost:5000/api/empleados (Crear)
router.post('/', empleadoController.create);

// GET http://localhost:5000/api/empleados (Obtener todos)
router.get('/', empleadoController.getAll);

// GET http://localhost:5000/api/empleados/:id (Obtener por ID)
router.get('/:id', empleadoController.getById);

// PUT http://localhost:5000/api/empleados/:id (Actualizar)
router.put('/:id', empleadoController.update);

// DELETE http://localhost:5000/api/empleados/:id (Eliminar)
router.delete('/:id', empleadoController.delete);

module.exports = router;
