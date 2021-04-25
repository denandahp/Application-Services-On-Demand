const Router = require('express').Router();
const auth = require('../middleware/auth.js');
const paymentActivity = require('../controllers/driverPayment.js');
const paymentIntegration = require('../controllers/paymentUtils.js');

Router.post('/activity/', auth, paymentActivity.add)
    .post('/snap', auth, paymentIntegration.generateSnap)
module.exports = Router;