const Router = require('express').Router();
const customerPayment = require('../controllers/customerPayment.js');

Router.post('/payment/menu', customerPayment.paymentMenu)
      .post('/payment/orderNumber', customerPayment.paymentOrdernumber)
      .post('/payment/rejectedorder', customerPayment.rejectedorder)
      
module.exports = Router;