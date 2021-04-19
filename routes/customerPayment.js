const Router = require('express').Router();
const customerPayment = require('../controllers/customerPayment.js');

Router.post('/JFOOD/payment/menu', customerPayment.paymentMenu)
      .post('/JFOOD/payment/orderNumber', customerPayment.paymentOrdernumber)
      .post('/JFOOD/payment/rejectedorder', customerPayment.rejectedorder)
      .get('/JFOOD/payment/detailorder/:kode', customerPayment.detailorder)
      .get('/JFOOD/orderprocess/datadriver/:id_driver', customerPayment.datadriver)

      
module.exports = Router;