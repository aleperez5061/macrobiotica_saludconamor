const mongoose = require('mongoose');
const EncuestaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    estado: { type: String, enum: ['activa', 'inactiva'], default: 'activa' },
    fecha_inicio: { type: Date, default: Date.now }
}, { collection: 'Encuestas', versionKey: false });
module.exports = mongoose.model('Encuesta', EncuestaSchema);