const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');


const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalContrller = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');



const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions',SessionController.store);

routes.get('/spots',SpotController.index);
routes.post('/spots',upload.single('thumbnail'),SpotController.store);

routes.get('/dashboard',DashboardController.show);

routes.post('/spots/:spot_id/bookings',BookingController.store);

routes.post('/bookings/:booking_id/approvals',ApprovalContrller.store);
routes.post('/bookings/:booking_id/rejections',RejectionController.store);

module.exports = routes;













// // GET, POST. PUT , DELETE
// // req.query = acessar query params  (para filtros)
// routes.get('/users/', (req, res) => {
//     return res.json({
//         id: req.query.idade
//     });
// });
// // req.body = acessar  corpo da requisicao (para criar editar)
// routes.post('/users/', (req, res) => {
//     return res.json(req.body);
// });
// // req.params = acessar route params (para editar ou deletar)
// routes.put('/users/:id', (req, res) => {
//     return res.json({
//         id: req.params.id
//     });
// });