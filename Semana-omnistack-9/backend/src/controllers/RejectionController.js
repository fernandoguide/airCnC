const Booking = require('../models/Booking');

module.exports ={
    async store(req , res){

        const booking = await Booking.findById(booking_id).populate('spot');

        booking.approved = false;
        
        await booking.save();

        return res.json (booking);
    } 
}