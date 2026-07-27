const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// POST http://localhost:5000/api/clientes (Crear)
router.post('/', clienteController.create);

// GET http://localhost:5000/api/clientes (Obtener todos)
router.get('/', clienteController.getAll);

// GET http://localhost:5000/api/clientes/:id (Obtener por ID de Mongo)
router.get('/:id', clienteController.getById);

module.exports = router;