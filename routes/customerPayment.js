const Router = require('express').Router();
const customerPayment = require('../controllers/customerPayment.js');

Router.post('/payment/menu', customerPayment.paymentMenu)
      .post('/payment/orderNumber', customerPayment.paymentOrdernumber)
      .post('/payment/rejectedorder', customerPayment.rejectedorder)
      .post('/payment/detailorder/:kode', customerPayment.detailorder)

      
module.exports = Router;