const Lanes = require('./lane.schema');
const moment = require('moment-timezone');
const Bookings = require('./booking.schema');

async function createLanes() {
    for (let index = 0; index < 8; index++) {
        const checkLane = await Lanes.exists({id: index+1})

        if (!checkLane) {
            await Lanes.create({id: index+1, bookedTime: 'null', bookedDate: 'null', bookingNumber: 'null'})
            console.log('new lane created')
        }
        else{
        }
    }
}

async function bookLanes(bData, bookingNumber) {
    const startTime = moment.tz(`${bData.date} ${bData.time}`, 'America/Scoresbysund').toDate();
    const endTime = moment(startTime).add(1, 'hour').toDate();
    const allLanes = [1,2,3,4,5,6,7,8];

    const lanesBooked = await Lanes.find({
        bookedDate: bData.date,
        bookedTime: {
            $gte: startTime.toISOString().slice(11, 16),
            $lt: endTime.toISOString().slice(11, 16)
        }
    });

    const bookedLanes = lanesBooked.map(lane => lane.id);
    const availableLanes = allLanes.filter(laneId => !bookedLanes.includes(String(laneId)));


    for (let i = 0; i < bData.lanes; i++) {
        const laneId = availableLanes[i];
        const booking =  await Lanes.create({
            id: laneId,
            bookedDate: bData.date,
            bookedTime: bData.time,
            bookingNumber: bookingNumber
        });
    }
    
    return;

}

async function checkLanes(bData){
    const startTime = moment.tz(`${bData.date} ${bData.time}`, 'America/Scoresbysund').toDate();
    const endTime = moment(startTime).add(1, 'hour').toDate();

    const amountBooked = await Lanes.countDocuments({
        bookedDate: bData.date,
        bookedTime: {
            $gte: startTime.toISOString().slice(11, 16),
            $lt: endTime.toISOString().slice(11, 16)
        }
    })

    if (amountBooked + bData.lanes > 8){
        return false;
        
    }
    else {

        return true;
    }
}

async function checkLanes2(bData){
    const startTime = moment.tz(`${bData.date} ${bData.time}`, 'America/Scoresbysund').toDate();
    const endTime = moment(startTime).add(1, 'hour').toDate();

    const amountBooked = await Lanes.countDocuments({
        bookedDate: bData.date,
        bookedTime: {
            $gte: startTime.toISOString().slice(11, 16),
            $lt: endTime.toISOString().slice(11, 16)
        }
    })
    const findBooking = await Bookings.findOne({bookingNumber: bData.bookingNumber})

    if (amountBooked + findBooking.lanes > 8){
        return false;
        
    }
    else {

        return true;
    }
}

async function updateLanesBooked(bData){
    const startTime = moment.tz(`${bData.date} ${bData.time}`, 'America/Scoresbysund').toDate();
    const endTime = moment(startTime).add(1, 'hour').toDate();
    const allLanes = [1,2,3,4,5,6,7,8];

    const lanesBooked = await Lanes.find({
        bookedDate: bData.date,
        bookedTime: {
            $gte: startTime.toISOString().slice(11, 16),
            $lt: endTime.toISOString().slice(11, 16)
        }
    });

    const findBooking = await Bookings.findOne({bookingNumber: bData.bookingNumber})
    const findLanes = await Lanes.find({bookingNumber: bData.bookingNumber})
    const bookedLanes = lanesBooked.map(lane => lane.id);
    const availableLanes = allLanes.filter(laneId => !bookedLanes.includes(String(laneId)));

    for (let i = 0; i < findBooking.lanes; i++) {
        const laneId = availableLanes[i];
        const booking =  await Lanes.updateOne({
            id: findLanes[i].id,
            bookingNumber: bData.bookingNumber
        },
        {$set: {
            id: laneId,
            bookedDate: bData.date,
            bookedTime: bData.time,
          }
        });
    }
    
    return;

}

async function deleteLaneBooking(bData){
    const deleted = await Lanes.deleteMany({bookingNumber: bData.bookingNumber})
    return deleted;
}

async function searchLaneBookings(bData){
    const date2 = new Date(bData.date2);
    date2.setDate(date2.getDate() + 1);
    
    const lanesBooked = await Lanes.find({
        bookedDate: {
            $gte: bData.date,
            $lt: date2.toISOString().slice(0, 10)
        }
    });
    return lanesBooked
}


module.exports = {createLanes, bookLanes, checkLanes, checkLanes2, updateLanesBooked, deleteLaneBooking, searchLaneBookings};