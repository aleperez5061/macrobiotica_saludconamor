const mongoose = require('mongoose');
const ReporteSchema = new mongoose.Schema({
    encuesta: { type: String, required: true },
    promedio_final: { type: Number, required: true },
    total_respuestas: { type: Number }
}, { collection: 'Reportes', versionKey: false });
module.exports = mongoose.model('Reporte', ReporteSchema);