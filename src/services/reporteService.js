const Respuesta = require('../models/respuesta');
const mongoose = require('mongoose');

class ReporteService {
    // Calcula el promedio de satisfacción usando operadores de agregación
    async generarEstadisticas(encuestaId) {
        return await Respuesta.aggregate([
            // Filtra solo las respuestas de la encuesta solicitada
            { $match: { encuesta_id: new mongoose.Types.ObjectId(encuestaId) } }, 
            // Agrupa y calcula el promedio ($avg) y el total ($sum) [6]
            { 
                $group: { 
                    _id: "$encuesta_id", 
                    promedio_satisfaccion: { $avg: "$valor" }, 
                    total_participantes: { $sum: 1 } 
                } 
            }
        ]);
    }
}

module.exports = new ReporteService();