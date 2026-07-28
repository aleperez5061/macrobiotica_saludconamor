const Bitacora = require('../models/bitacora');

class BitacoraService {
    async createBitacora(data) {
        const nuevoRegistro = new Bitacora(data);
        return await nuevoRegistro.save();
    }

    async getBitacoras() {
        return await Bitacora.find();
    }

    async getBitacoraById(id) {
        return await Bitacora.findById(id);
    }
}

module.exports = new BitacoraService();
