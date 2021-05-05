const Router = require('express').Router();
const customerReview = require('../controllers/customerReview.js');

Router.post('/jfood/driverreview', customerReview.jfooddriverreview)
      .post('/jfood/merchantreview', customerReview.jfoodmerchantreview)
      .post('/jride/driverreview', customerReview.driverreview)

      
module.exports = Router;