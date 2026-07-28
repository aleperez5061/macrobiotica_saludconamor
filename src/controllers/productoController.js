// src/controllers/productoController.js
const productoService = require('../services/productoService');

class ProductoController {
    async create(req, res) {
        try {
            const producto = await productoService.createProducto(req.body);
            res.status(201).json(producto);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const productos = await productoService.getProductos();
            res.json(productos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const producto = await productoService.getProductoById(req.params.id);
            if (!producto) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json(producto);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const producto = await productoService.updateProducto(req.params.id, req.body);
            if (!producto) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json(producto);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const producto = await productoService.deleteProducto(req.params.id);
            if (!producto) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json({ message: 'Producto eliminado' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new ProductoController();
