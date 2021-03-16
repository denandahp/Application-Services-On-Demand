const Router = require('express').Router();
const notification = require('../controllers/merchantNotiffood.js');

Router.post('/orderfood/merchanttodriver', notification.orderfood_merchanttodriver)
      .post('/rejectedfood/merchanttocustomer', notification.rejectedfood_merchanttocustomer)
      .post('/processfood/merchanttodriver', notification.processfood_merchanttodriver)
      
module.exports = Router;