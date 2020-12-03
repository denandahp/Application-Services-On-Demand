const Router = require('express').Router();
const schedule = require('../controllers/schedule.js');

Router.post('/schedule/register', schedule.register)
      .post('/schedule/update', schedule.update)
      .get('/bySchedule/:username', schedule.get)
 

module.exports = Router;