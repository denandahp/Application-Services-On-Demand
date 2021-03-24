const Router = require('express').Router();
const notification = require('../controllers/driverNotiffood.js');

Router.post('/orderfood/drivertomerchant', notification.orderfood_drivertomerchant)
      .post('/orderfood/drivertocustomer', notification.orderfood_drivertocustomer)
      .post('/processfood/drivertocustomer', notification.processfood_drivertocustomer)
      .post('/deliverfood/drivertocustomer', notification.deliverfood_drivertocustomer)
      .post('/arrivedfood/drivertocustomer', notification.arrivedfood_drivertocustomer)
      .post('/finishedfood/drivertocustomer', notification.finishedfood_drivertocustomer)

module.exports = Router;