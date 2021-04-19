const Router = require('express').Router();
const auth = require('../middleware/auth.js');
const order = require('../controllers/driverOrder.js');

Router
    .get('/incomingorder/:kode', auth, order.incomingorder)
    .post('/acceptorder/:kode', auth, order.acceptorder)
    .get('/dataorder/:kode', auth, order.dataorder)
    .post('/rejectorder/:kode', auth, order.rejectorder)
    .put('/updatedatadriver', auth, order.updatedatadriver)
    .put('/verifikasi/:kode', auth, order.verifikasi)
    .put('/antarkanpesanan/:kode', auth, order.antarkanpesanan)
    .put('/selesaiantar/:kode', auth, order.selesaiantar)
    .put('/pesananselesai/:kode', auth, order.pesananselesai)

module.exports = Router;