const Router = require('express').Router();
const order = require('../controllers/merchantOrder.js');

Router.post('/acceptedorder', order.opsistatus)
      .post('/orderready', order.orderready)
      .post('/rejectorder', order.rejectorder)
      .get('/pesananmasuk/:kode', order.pesananmasuk)
      .get('/transaksi/:status', order.transaksiorder)
      
      
module.exports = Router;