const {createBooking, updateWhenBooked, deleteBooking, bookingSearchParams} = require('../model/booking.model')
const {bookLanes, updateLanesBooked, deleteLaneBooking, searchLaneBookings} = require('../model/lane.model')
const uuid = require('uuid')


const newBooking =  async (req, res) => {
    const bData = req.body;
    const bookingNumber = uuid.v4()
    const price = (bData.people * 120) + (bData.lanes * 100)

    createBooking(bData, price, bookingNumber)
    bookLanes(bData, bookingNumber)

    return res.status(200).json({
        success: true,
      });
}

const updateBooking = async (req, res) => {
    const bData = req.body;

    updateWhenBooked(bData)
    updateLanesBooked(bData)

    return res.status(200).json({
        success: true,
        message: "update success"
      });
}

const deleteData = async (req, res) => {
    const bData = req.body;

    deleteBooking(bData)
    deleteLaneBooking(bData)

    return res.status(200).json({
        success: true,
        message: "delete success"
      });
}

const getBooking = async (req, res) => {
    const bData = req.params.id;
    const booking = await bookingSearchParams(bData)
    if (booking) {
        return res.status(200).json({
            success: true,
            message: "booking found",
            message: booking
          });
    }
    else {
        return res.status(400).json({
            success: false,
            message: "booking not found"
          });
    }
}   

const searchBookings = async (req, res) => {
    const bData = req.body;
    const bookings = await searchLaneBookings(bData)
    if (bookings.length > 0) {
        return res.status(200).json({
            success: true,
            message: "these are the found bookings",
            message: bookings
          });
    }
    else {
        return res.status(400).json({
            success: true,
            message: "no bookings found"
          });
    }
}

module.exports = {newBooking, updateBooking, deleteData, getBooking, searchBookings};