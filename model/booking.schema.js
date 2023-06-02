const mongoose = require('mongoose');
const moment = require('moment')

const bookingSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    time: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: String
    },
    people: {
        required: true,
        type: Number
    },
    lanes: {
        required: true,
        type: Number
    },
    shoesizes: {
        required: true,
        type: [{ name: String, shoesize: Number}]
    },
    price: {
        required: true,
        type: String
    },
    bookingNumber: {
        required: true,
        type: String
    },
    OrderCreated: {
        required: true,
        type: String,
        default: () => {
            return moment().format('YY/MM/DD');
        }
    }
})

module.exports = mongoose.model('Bookings', bookingSchema);
