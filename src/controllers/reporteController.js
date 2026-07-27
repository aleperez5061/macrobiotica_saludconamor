const reporteService = require('../services/reporteService');

class ReporteController {
    async generate(req, res) {
        try {
            const { encuestaId } = req.params;
            const stats = await reporteService.generarEstadisticas(encuestaId);
            
            if (stats.length === 0) {
                return res.status(404).json({ message: "No hay respuestas para esta encuesta" });
            }

            res.json(stats);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new ReporteController();