const Router = require('express').Router();
const price = require('../controllers/dashboardPrice.js');

Router.post('/pricingpost', price.pricingpost)
    .post('/pricingget/:service', price.pricingget)

module.exports = Router;