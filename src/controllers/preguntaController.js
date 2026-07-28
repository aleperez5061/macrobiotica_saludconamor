// src/controllers/preguntaController.js
const preguntaService = require('../services/preguntaService');

class PreguntaController {
    async create(req, res) {
        try {
            const pregunta = await preguntaService.createPregunta(req.body);
            res.status(201).json(pregunta);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const preguntas = await preguntaService.getPreguntas();
            res.json(preguntas);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const pregunta = await preguntaService.getPreguntaById(req.params.id);
            if (!pregunta) {
                return res.status(404).json({ message: 'Pregunta no encontrada' });
            }
            res.json(pregunta);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const pregunta = await preguntaService.updatePregunta(req.params.id, req.body);
            if (!pregunta) {
                return res.status(404).json({ message: 'Pregunta no encontrada' });
            }
            res.json(pregunta);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const pregunta = await preguntaService.deletePregunta(req.params.id);
            if (!pregunta) {
                return res.status(404).json({ message: 'Pregunta no encontrada' });
            }
            res.json({ message: 'Pregunta eliminada' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new PreguntaController();
