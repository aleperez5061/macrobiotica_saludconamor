const Respuesta = require('../models/respuesta');

class RespuestaService {
    async registrarRespuesta(data) {
        const nuevaRespuesta = new Respuesta(data);
        return await nuevaRespuesta.save();
    }
}

module.exports = new RespuestaService();