const Router = require('express').Router();
const customerReview = require('../controllers/customerReview.js');

Router.post('/JFOOD/driverreview', customerReview.driverreview)
      .post('/JFOOD/merchantreview', customerReview.merchantreview)

      
module.exports = Router;