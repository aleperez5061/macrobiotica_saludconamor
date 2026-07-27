// src/controllers/clienteController.js
const clienteService = require('../services/clienteService');

class ClienteController {
    // Crear un nuevo cliente (POST)
    async create(req, res) {
        try {
            // Toma los datos del "body" de Postman y los envía al servicio
            const cliente = await clienteService.createCliente(req.body);
            res.status(201).json(cliente); // 201: Creado con éxito
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Obtener todos los clientes (GET)
    async getAll(req, res) {
        try {
            const clientes = await clienteService.getClientes();
            res.json(clientes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Obtener un cliente por su ID (GET)
    async getById(req, res) {
        try {
            // Extrae el ID de la URL (req.params.id)
            const cliente = await clienteService.getClienteById(req.params.id);
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente no encontrado' });
            }
            res.json(cliente);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new ClienteController();