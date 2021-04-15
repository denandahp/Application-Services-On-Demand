const Router = require('express').Router();
const customerReview = require('../controllers/customerReview.js');

Router.post('/driverreview', customerReview.driverreview)
      .post('/merchantreview', customerReview.merchantreview)

      
module.exports = Router;