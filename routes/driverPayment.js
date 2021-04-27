const Router = require('express').Router();
const auth = require('../middleware/auth.js');
const paymentActivity = require('../controllers/driverPayment.js');
const paymentIntegration = require('../controllers/paymentUtils.js');

Router.post('/activity/', paymentActivity.add)
    .post('/snap', auth, paymentIntegration.generateSnap)
    .get('/saldo', auth, paymentActivity.saldo)
    .get('/history', auth, paymentActivity.history)

module.exports = Router;