const Router = require('express').Router();
const customerPayment = require('../controllers/customerPayment.js');

Router.post('/jfood/payment/menu', customerPayment.paymentMenu)
      .post('/jfood/payment/orderNumber', customerPayment.paymentOrdernumber)
      .post('/jfood/payment/rejectedorder', customerPayment.rejectedorder)
      .get('/jfood/payment/detailorder/:kode', customerPayment.detailorder)
      .get('/jfood/orderprocess/datadriver/:id_driver', customerPayment.datadriver)

      
module.exports = Router;