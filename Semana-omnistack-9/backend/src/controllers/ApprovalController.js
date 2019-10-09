const Booking = require('../models/Booking');



module.exports = {
    // metodo que cria uma aprovacao
    async store(req, res) {

        const { booking_id } = req.params;
        const booking = await Booking.findById(booking_id).populate('spot');
        booking.approved = true;
        await booking.save();

        // buscando uma conexao em tempo real 
        // passei no req todos os usuarios conectados a applc
        // como foi realizado o metodo polulate dentro do spot tera um atribudo user para consultar
        const bookigUserSocket = req.connectedUsers[booking.user];

        // se existir uma conexao em tempo real com bookigUserSocket
        if (bookigUserSocket) {
            // envio uma msg e passo o obj de booking
            req.io.to(bookigUserSocket).emit('booking_response', booking);
        }

        return res.json(booking);
    }
}