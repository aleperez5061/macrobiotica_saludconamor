const Cliente = require('../models/cliente');

class ClienteService {
    // Crea un nuevo cliente recibiendo parámetros dinámicos (req.body)
    async createCliente(data) {
        const nuevoCliente = new Cliente(data);
        return await nuevoCliente.save();
    }

    // Recupera la lista completa de clientes
    async getClientes() {
        return await Cliente.find();
    }

    // Busca un cliente por su ID único de Mongo
    async getClienteById(id) {
        return await Cliente.findById(id);
    }
}

module.exports = new ClienteService();