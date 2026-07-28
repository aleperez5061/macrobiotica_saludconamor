const mongoose = require('mongoose');
const FeedbackSchema = new mongoose.Schema({
    comentario: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    encuesta_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Encuesta', required: false }
}, { collection: 'Feedback_Directo', versionKey: false });
module.exports = mongoose.model('Feedback', FeedbackSchema);