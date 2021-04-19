const Router = require('express').Router();
const notification = require('../controllers/driverNotiffood.js');

Router.post('/acceptjride/drivertocustomer', notification.acceptjride_drivertocustomer)
      .post('/deliverjride/drivertocustomer', notification.deliverjride_drivertocustomer)
      .post('/finishedjride/drivertocustomer', notification.finishedjride_drivertocustomer)

module.exports = Router;