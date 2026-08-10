const Respuesta = require('../models/respuesta');
const mongoose = require('mongoose');

class ReporteService {
    // Calcula el promedio de satisfacción usando operadores de agregación
    async generarEstadisticas(encuestaId) {
        const objectId = new mongoose.Types.ObjectId(encuestaId);

        // 1. Estadísticas generales: promedio y total de participantes únicos.
        //    Cada envío de encuesta genera varios documentos (una respuesta por
        //    pregunta) compartiendo el mismo intento_id, por lo que se agrupa
        //    por intento_id para no contar de más. Los registros antiguos sin
        //    intento_id se cuentan por su _id (1 participante por documento).
        const stats = await Respuesta.aggregate([
            { $match: { encuesta_id: objectId } },
            {
                $group: {
                    _id: {
                        intento: { $ifNull: ["$intento_id", "$_id"] }
                    },
                    promedio_satisfaccion: { $avg: "$valor" }
                }
            },
            {
                $group: {
                    _id: null,
                    promedio_satisfaccion: { $avg: "$promedio_satisfaccion" },
                    total_participantes: { $sum: 1 }
                }
            },
            { $project: { _id: 0, promedio_satisfaccion: 1, total_participantes: 1 } }
        ]);

        if (stats.length === 0) {
            return [];
        }

        // 2. Distribución de calificaciones (cuántos votos recibió cada valor 1-5)
        const distribucion = await Respuesta.aggregate([
            { $match: { encuesta_id: objectId } },
            { $group: { _id: "$valor", cantidad: { $sum: 1 } } }
        ]);

        const contador = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        distribucion.forEach(d => {
            contador[d._id] = d.cantidad;
        });

        return [{
            ...stats[0],
            distribucion: [1, 2, 3, 4, 5].map(valor => ({
                valor,
                cantidad: contador[valor]
            }))
        }];
    }
}

module.exports = new ReporteService();