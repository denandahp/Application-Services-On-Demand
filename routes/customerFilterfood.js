const Router = require('express').Router();
const Filterfood = require('../controllers/customerFilterfood.js');

Router.get('/searchByname', Filterfood.searchbyName)
      .get('/searchBycategory', Filterfood.searchBycategory)
      .get('/allResto', Filterfood.allResto)
      .get('/jFoodlist', Filterfood.jFoodlist)
      .get('/filterinname', Filterfood.filterinname)
      .get('/filterincategory', Filterfood.filterincategory)


      
module.exports = Router;