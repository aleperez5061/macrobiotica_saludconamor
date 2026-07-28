const Feedback = require('../models/feedback');

class FeedbackService {
    async createFeedback(data) {
        const nuevoFeedback = new Feedback(data);
        return await nuevoFeedback.save();
    }

    async getFeedbacks() {
        return await Feedback.find();
    }

    async getFeedbackById(id) {
        return await Feedback.findById(id);
    }

    async deleteFeedback(id) {
        return await Feedback.findByIdAndDelete(id);
    }
}

module.exports = new FeedbackService();
