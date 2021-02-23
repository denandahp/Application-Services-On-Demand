const Router = require('express').Router();
const notification = require('../controllers/customerNotiffood.js');

Router.post('/orderfoodtodriver', notification.orderfoodtodriver)
      .get('/searchBycategory', notification.searchBycategory)
      
module.exports = Router;