const Booking = require ('../models/Booking');

module.exports ={
    async store(req,res){
        const { user_id } = req.headers;
        const {spot_id } = req.params;
        const { date } =  req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        await booking.populate('spot').populate('user').execPopulate();


// buscando uma conexao em tempo real 
// passei no req todos os usuarios conectados a applc
// como foi realizado o metodo polulate dentro do spot tera um atribudo user para consultar
        const ownerSocket = req.connectedUsers[booking.spot.user];

        // se existir uma conexao em tempo real com ownerSocket
        if(ownerSocket){
            // envio uma msg e passo o obj de booking
            req.io.to(ownerSocket).emit('booking_request',booking);
        }

        return res.json(booking);
    } 
};