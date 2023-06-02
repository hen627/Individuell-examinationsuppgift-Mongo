const Bookings = require('./booking.schema');


async function createBooking(bData, price, bookingNumber) {

    const create = await Bookings.create({email: bData.email, time: bData.time, 
        date: bData.date, people: bData.people,
        lanes: bData.lanes, shoesizes: bData.shoesizes,
        price: price, bookingNumber: bookingNumber})
    return create;
}

async function updateWhenBooked(bData){
    const update = await Bookings.updateMany(
        { bookingNumber: bData.bookingNumber},
        { $set: { time: bData.time, date: bData.date}}
    )

    return update;
}



async function bookingSearch(bData){
    const checkForBooking = await Bookings.findOne( {bookingNumber: bData.bookingNumber})
 return checkForBooking;
}

async function bookingSearchParams(bData){
    const checkForBooking = await Bookings.findOne( {bookingNumber: bData})
 return checkForBooking;
}

async function deleteBooking(bData){
    const deleteData = await Bookings.deleteOne({bookingNumber: bData.bookingNumber})
    return deleteData;
}

module.exports = {createBooking, updateWhenBooked, bookingSearch, bookingSearchParams, deleteBooking}