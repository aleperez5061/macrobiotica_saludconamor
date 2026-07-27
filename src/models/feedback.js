const mongoose = require('mongoose');
const FeedbackSchema = new mongoose.Schema({
    comentario: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
}, { collection: 'Feedback_Directo', versionKey: false });
module.exports = mongoose.model('Feedback', FeedbackSchema);