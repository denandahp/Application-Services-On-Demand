const Router = require('express').Router();
const customerReview = require('../controllers/customerReview.js');

Router.post('/jfood/driverreview', customerReview.driverreview)
      .post('/jfood/merchantreview', customerReview.merchantreview)

      
module.exports = Router;