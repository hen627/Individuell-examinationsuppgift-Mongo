const moment = require('moment');
const {checkLanes, checkLanes2} = require('../model/lane.model')
const {bookingSearch} = require('../model/booking.model')

const validateData = (req, res, next) => {
    const bData = req.body;
    const timeValidator = /^(([1]{1}[2-9]{1})|([2]{1}[0-2]{1}))(([:]{1})?)(([0-5]{1}[0-9]?)?)$/;
    const dateValidator = moment(bData.date)
    console.log("hello")
try{
    if (!bData.email.includes("@")){
        console.log("invalid email")
        return res.status(400).json({
            success: false,
            message: "invalid email",
          });
    }
    if (!timeValidator.test(bData.time)){
        console.log("invalid time, lane bookings can only be placed between 12:00pm to 22:59pm")
        return res.status(400).json({
            success: false,
            message: "invalid time, lane bookings can only be placed between 12:00pm to 22:59pm",
          });
    }

    if (!dateValidator.isValid()){
        console.log("invalid date, format is YYYY-MM-DD")
        return res.status(400).json({
            success: false,
            message: "invalid date, format is YYYY-MM-DD",
          });
    }

    if (bData.people <= 0 || bData.lanes <= 0 || bData.lanes > 8){
        console.log("Incorrect customer or lane value")
        return res.status(400).json({
            success: false,
            message: "Incorrect customer or lane value",
          });
    }
    if (bData.shoesizes.length !== bData.people){
        console.log("Shoesizes and registered customers do not match")
        return res.status(400).json({
            success: false,
            message: "Shoesizes and registered customers do not match",
          });
    }
    next();
} catch (error) {
    return res.status(400).json({
        success: false,
        message: error.message,
    });
}
}

const laneControl = async (req, res, next) => {
    const bData = req.body;
    const check = await checkLanes(bData)
    if (check){
        next();
    }
    else{
        return res.status(400).json({
            success: false,
            message: "not enough available lanes.",
        });
    }
}    

const laneControl2 = async (req, res, next) => {
    const bData = req.body;
    const check = await checkLanes2(bData)
    if (check){
        next();
    }
    else{
        return res.status(400).json({
            success: false,
            message: "not enough available lanes.",
        });
    }
}    

const validateUpdate = (req, res, next) => {
    const bData = req.body;
    const timeValidator = /^(([1]{1}[2-9]{1})|([2]{1}[0-2]{1}))(([:]{1})?)(([0-5]{1}[0-9]?)?)$/;
    const dateValidator = moment(bData.date)
try{
    if (!timeValidator.test(bData.time)){
        console.log("invalid time, lane bookings can only be placed between 12:00pm to 22:59pm")
        return res.status(400).json({
            success: false,
            message: "invalid time, lane bookings can only be placed between 12:00pm to 22:59pm",
          });
    }

    if (!dateValidator.isValid()){
        console.log("invalid date, format is YYYY-MM-DD")
        return res.status(400).json({
            success: false,
            message: "invalid date, format is YYYY-MM-DD",
          });
    }
    next();
} catch (error) {
    return res.status(400).json({
        success: false,
        message: error.message,
    });
}

}

const bookingControl = async (req, res, next) => {
    const bData = req.body
    const control = await bookingSearch(bData)
    if (control){
        next();
    }
    else{
        return res.status(400).json({
            success: false,
            message: "booking doesn't exist",
        });
    }
}

const dateControl = async (req, res, next) => {
    const bData = req.body
    const dateValidator = moment(bData.date)
    const dateValidator2 = moment(bData.date2)

    if (!dateValidator.isValid()){
        console.log("invalid date, format is YYYY-MM-DD")
        return res.status(400).json({
            success: false,
            message: "invalid date, format is YYYY-MM-DD",
          });
    }
    if (!dateValidator2.isValid()){
        console.log("invalid date, format is YYYY-MM-DD")
        return res.status(400).json({
            success: false,
            message: "invalid date, format is YYYY-MM-DD",
          });
    }
        next();
}



module.exports = {validateData, laneControl, laneControl2, validateUpdate, bookingControl, dateControl};

