// src/controllers/feedbackController.js
const feedbackService = require('../services/feedbackService');

class FeedbackController {
    async create(req, res) {
        try {
            const feedback = await feedbackService.createFeedback(req.body);
            res.status(201).json(feedback);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const feedbacks = await feedbackService.getFeedbacks();
            res.json(feedbacks);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const feedback = await feedbackService.getFeedbackById(req.params.id);
            if (!feedback) {
                return res.status(404).json({ message: 'Feedback no encontrado' });
            }
            res.json(feedback);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const feedback = await feedbackService.deleteFeedback(req.params.id);
            if (!feedback) {
                return res.status(404).json({ message: 'Feedback no encontrado' });
            }
            res.json({ message: 'Feedback eliminado' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new FeedbackController();
