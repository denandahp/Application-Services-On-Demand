const Router = require('express').Router();
const menuJfood = require('../controllers/customerMenujfood.js');

Router.get('/listMenu/:restaurant_id', menuJfood.listMenu)
      .get('/infoResto/:restaurant_id', menuJfood.infoResto)


      
module.exports = Router;