const Router = require('express').Router();
const customerNotifjride = require('../controllers/customerNotifjride.js');

Router.post('/orderjride/customertodriver', customerNotifjride.orderjride_customertodriver)
      
module.exports = Router;