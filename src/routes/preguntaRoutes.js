const express = require('express');
const router = express.Router();
const preguntaController = require('../controllers/preguntaController');

// POST http://localhost:5000/api/preguntas (Crear)
router.post('/', preguntaController.create);

// GET http://localhost:5000/api/preguntas (Obtener todas)
router.get('/', preguntaController.getAll);

// GET http://localhost:5000/api/preguntas/:id (Obtener por ID)
router.get('/:id', preguntaController.getById);

// PUT http://localhost:5000/api/preguntas/:id (Actualizar)
router.put('/:id', preguntaController.update);

// DELETE http://localhost:5000/api/preguntas/:id (Eliminar)
router.delete('/:id', preguntaController.delete);

module.exports = router;
