const mongoose = require('mongoose');

const LaneSchema = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },
    bookedTime: {
        required: true,
        type: String
    },
    bookedDate: {
        required: true,
        type: String
    },
    bookingNumber: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('Lanes', LaneSchema);