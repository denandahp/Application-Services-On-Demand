const Router = require('express').Router();
const customerListOrder = require('../controllers/customerListOrder.js');

Router.get('/listorder/:id_user', customerListOrder.listorder)
      .get('/detailorder/:id_user/:kode', customerListOrder.detailorder)
      
module.exports = Router;