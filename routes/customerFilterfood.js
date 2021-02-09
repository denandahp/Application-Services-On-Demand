const Router = require('express').Router();
const Filterfood = require('../controllers/customerFilterfood.js');

Router.get('/searchByname', Filterfood.searchbyName)
      .get('/searchBycategory', Filterfood.searchBycategory)
      
module.exports = Router;