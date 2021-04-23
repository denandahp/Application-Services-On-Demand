const Router = require('express').Router();
const customerPayment = require('../controllers/customerPayment.js');

Router.post('/jfood/payment/menu', customerPayment.paymentMenu)
      .post('/jfood/payment/orderNumber', customerPayment.paymentOrdernumber)
      .post('/jfood/payment/rejectedorder', customerPayment.rejectedorder)
      .get('/jfood/payment/detailorder/:kode', customerPayment.detailorder)
      .get('/jfood/orderprocess/datadriver/:id_driver', customerPayment.datadriverjfood)
      .post('/jride/payment/orderJride', customerPayment.orderJride)
      .get('/jride/payment/ongkir/:distance', customerPayment.ongkirJride)
      .get('/jride/orderprocess/datadriver/:kode', customerPayment.datadriverjride)



      
module.exports = Router;