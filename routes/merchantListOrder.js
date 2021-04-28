const Router = require('express').Router();
const merchantListOrder = require('../controllers/merchantListOrder.js');

Router.get('merchant/listorder/:id_merchant', merchantListOrder.listorder)
      .get('merchant/detailorder/:id_merchant/:kode', merchantListOrder.detailorder)
      .get('customer/listorder/:customer_id', merchantListOrder.listordercustomer)
      .get('customer/detailorder/:customer_id/:kode', merchantListOrder.detailordercustomer)


      
module.exports = Router;