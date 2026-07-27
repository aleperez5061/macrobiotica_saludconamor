const mongoose = require('mongoose');
const PreguntaSchema = new mongoose.Schema({
    texto: { type: String, required: true },
    tipo: { type: String, default: 'escala_1_al_5' } // Definido en el avance [3]
}, { collection: 'Preguntas', versionKey: false });
module.exports = mongoose.model('Pregunta', PreguntaSchema);