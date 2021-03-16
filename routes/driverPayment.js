const Router = require('express').Router();
const paymentIntegration  = require('../controllers/paymentUtils.js');

Router.post('/snap', paymentIntegration.generateSnap)
      
module.exports = Router;