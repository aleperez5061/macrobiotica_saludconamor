const mongoose = require('mongoose');
const RespuestaSchema = new mongoose.Schema({
    encuesta_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Encuesta', required: true },
    valor: { type: Number, required: true, min: 1, max: 5 },
    pregunta_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Pregunta', required: false },
    intento_id: { type: String, required: false },
    fecha_respuesta: { type: Date, default: Date.now }
}, { collection: 'Respuestas', versionKey: false });
RespuestaSchema.index({ encuesta_id: 1 }); // Índice para optimizar reportes [5]
module.exports = mongoose.model('Respuesta', RespuestaSchema);