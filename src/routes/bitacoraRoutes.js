const express = require('express');
const router = express.Router();
const bitacoraController = require('../controllers/bitacoraController');

// POST http://localhost:5000/api/bitacora (Crear registro)
router.post('/', bitacoraController.create);

// GET http://localhost:5000/api/bitacora (Obtener todos los registros)
router.get('/', bitacoraController.getAll);

// GET http://localhost:5000/api/bitacora/:id (Obtener por ID)
router.get('/:id', bitacoraController.getById);

// Nota: la bitácora es un registro de auditoría, por eso a propósito
// NO tiene rutas de update/delete (un log no debería poder editarse ni borrarse).

module.exports = router;
