const Router = require('express').Router();
const merchantInfoproduk = require('../controllers/merchantInfoproduk.js');

Router.post('/register', merchantInfoproduk.register)
      .post('/update', merchantInfoproduk.update)
      .post('/delete', merchantInfoproduk.delete)
      .post('/kategoribaru', merchantInfoproduk.kategoribaru)
      .post('/setstock', merchantInfoproduk.stockbaru)
      .get('/detailproduk/:restaurant_id/:id_kategori/:id_product', merchantInfoproduk.get)
      .get('/kategori/:restaurant_id', merchantInfoproduk.getkategori)
      .get('/getstock/:restaurant_id', merchantInfoproduk.getstock)
      .get('/stateMenu/:user_id', merchantInfoproduk.stateMenu);

module.exports = Router;