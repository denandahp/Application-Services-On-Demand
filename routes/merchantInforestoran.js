const Router = require('express').Router();
const merchantInforestoran = require('../controllers/merchantInforestoran.js');

Router.post('/register', merchantInforestoran.register)
      .post('/update', merchantInforestoran.update)
      .delete('/delete', merchantInforestoran.delete)
      .get('/byuser_id/:user_id', merchantInforestoran.get)
      .get('/kategoriresto', merchantInforestoran.getkategori)
      .get('/waktupersiapan', merchantInforestoran.waktupersiapan)
      .get('/infoRestosaya/:user_id', merchantInforestoran.infoRestosaya)

      
module.exports = Router;