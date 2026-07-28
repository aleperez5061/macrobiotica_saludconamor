const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// POST http://localhost:5000/api/feedback (Crear comentario)
router.post('/', feedbackController.create);

// GET http://localhost:5000/api/feedback (Obtener todos)
router.get('/', feedbackController.getAll);

// GET http://localhost:5000/api/feedback/:id (Obtener por ID)
router.get('/:id', feedbackController.getById);

// DELETE http://localhost:5000/api/feedback/:id (Eliminar comentario, ej. spam)
router.delete('/:id', feedbackController.delete);

// Nota: no incluye PUT — un comentario de feedback no debería poder
// editarse una vez enviado (perdería su valor como testimonio real).

module.exports = router;
