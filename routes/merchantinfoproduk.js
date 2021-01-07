const Router = require('express').Router();
const merchantInfoproduk = require('../controllers/merchantInfoproduk.js');

Router.post('/register', merchantInfoproduk.register)
      .post('/update', merchantInfoproduk.update)
      .post('/delete', merchantInfoproduk.delete)
      .post('/kategoribaru', merchantInfoproduk.kategoribaru)
      .get('/byrestaurant_id/:restaurant_id', merchantInfoproduk.get)
      .get('/kategori/:merchant_id', merchantInfoproduk.getkategori);
      
module.exports = Router;