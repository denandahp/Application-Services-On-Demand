const Router = require('express').Router();
const merchantInfoproduk = require('../controllers/merchantInfoproduk.js');

Router.post('/register', merchantInfoproduk.register)
      .post('/update', merchantInfoproduk.update)
      .post('/delete', merchantInfoproduk.delete)
      .post('/kategoribaru', merchantInfoproduk.kategoribaru)
      .post('/setstock', merchantInfoproduk.stockproduk)
      .get('/byrestaurant_id/:restaurant_id', merchantInfoproduk.get)
      .get('/kategori/:restaurant_id', merchantInfoproduk.getkategori)
      .get('/getstock/:id_product', merchantInfoproduk.getstock);
      
module.exports = Router;