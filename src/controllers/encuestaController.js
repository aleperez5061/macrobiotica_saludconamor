// src/controllers/encuestaController.js
const encuestaService = require('../services/encuestaService');

class EncuestaController {
    async create(req, res) {
        try {
            const encuesta = await encuestaService.createEncuesta(req.body);
            res.status(201).json(encuesta);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const encuestas = await encuestaService.getEncuestas();
            res.json(encuestas);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new EncuestaController();