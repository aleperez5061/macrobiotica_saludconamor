// src/controllers/categoriaController.js
const categoriaService = require('../services/categoriaService');

class CategoriaController {
    async create(req, res) {
        try {
            const categoria = await categoriaService.createCategoria(req.body);
            res.status(201).json(categoria);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const categorias = await categoriaService.getCategorias();
            res.json(categorias);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const categoria = await categoriaService.getCategoriaById(req.params.id);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }
            res.json(categoria);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const categoria = await categoriaService.updateCategoria(req.params.id, req.body);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }
            res.json(categoria);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const categoria = await categoriaService.deleteCategoria(req.params.id);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }
            res.json({ message: 'Categoría eliminada' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new CategoriaController();