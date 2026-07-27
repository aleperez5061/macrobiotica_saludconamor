const express = require('express');
const router = express.Router();
const respuestaController = require('../controllers/respuestaController');

// POST http://localhost:5000/api/respuestas
router.post('/', respuestaController.create);

module.exports = router;