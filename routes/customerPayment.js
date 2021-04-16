const Router = require('express').Router();
const customerPayment = require('../controllers/customerPayment.js');

Router.post('/payment/menu', customerPayment.paymentMenu)
      .post('/payment/orderNumber', customerPayment.paymentOrdernumber)
      .post('/payment/rejectedorder', customerPayment.rejectedorder)
      .get('/payment/detailorder/:kode', customerPayment.detailorder)
      .get('/orderprocess/datadriver/:id_driver', customerPayment.datadriver)

      
module.exports = Router;