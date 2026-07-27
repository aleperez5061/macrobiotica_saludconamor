const Encuesta = require('../models/encuesta');

class EncuestaService {
    async createEncuesta(data) {
        const nuevaEncuesta = new Encuesta(data);
        return await nuevaEncuesta.save();
    }

    async getEncuestas() {
        return await Encuesta.find();
    }
}

module.exports = new EncuestaService();