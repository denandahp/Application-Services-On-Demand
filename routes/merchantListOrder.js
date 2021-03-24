const Router = require('express').Router();
const merchantListOrder = require('../controllers/merchantListOrder.js');

Router.get('/listorder/:id_merchant', merchantListOrder.listorder)
      .get('/detailorder/:id_merchant/:kode', merchantListOrder.detailorder)
      
module.exports = Router;