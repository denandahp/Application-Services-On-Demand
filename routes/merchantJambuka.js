const Router = require('express').Router();
const merchantJambuka = require('../controllers/merchantJambuka.js');

Router.post('/register', merchantJambuka.register)
      .post('/update', merchantJambuka.update)
      .post('/closedresto', merchantJambuka.closedresto)
      .get('/byUser_id/:user_id', merchantJambuka.get)
      .get('/stateJambuka/:user_id', merchantJambuka.stateJambuka)

      
module.exports = Router;