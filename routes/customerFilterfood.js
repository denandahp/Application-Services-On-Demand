const Router = require('express').Router();
const Filterfood = require('../controllers/customerFilterfood.js');

Router.get('/searchByname', Filterfood.searchbyName)
      .get('/searchBycategory', Filterfood.searchBycategory)
      .get('/jFoodlist', Filterfood.jFoodlist)

      
module.exports = Router;