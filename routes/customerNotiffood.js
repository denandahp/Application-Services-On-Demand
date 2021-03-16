const Router = require('express').Router();
const notification = require('../controllers/customerNotiffood.js');

Router.post('/orderfoodtodriver', notification.orderfoodtodriver)
      .post('/orderfood/customertomerchant', notification.orderfood_customertomerchant)
      
module.exports = Router;