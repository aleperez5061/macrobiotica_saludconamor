const Pregunta = require('../models/pregunta');

class PreguntaService {
    async createPregunta(data) {
        const nuevaPregunta = new Pregunta(data);
        return await nuevaPregunta.save();
    }

    async getPreguntas() {
        return await Pregunta.find();
    }

    async getPreguntaById(id) {
        return await Pregunta.findById(id);
    }

    async updatePregunta(id, data) {
        return await Pregunta.findByIdAndUpdate(id, data, { new: true });
    }

    async deletePregunta(id) {
        return await Pregunta.findByIdAndDelete(id);
    }
}

module.exports = new PreguntaService();
