const { Router } = require('express')
const router = new Router()
const {validateData, laneControl, laneControl2,validateUpdate, bookingControl, dateControl} = require('../middleware/middleware')
const {newBooking, updateBooking, deleteData, getBooking, searchBookings} = require('../controller/controller')



module.exports = router

router.post('/booking', validateData, laneControl, newBooking)
router.put('/update', validateUpdate, bookingControl, laneControl2, updateBooking)
router.delete('/delete', bookingControl, deleteData)
router.get('/:id', getBooking)
router.post('/search', dateControl, searchBookings)