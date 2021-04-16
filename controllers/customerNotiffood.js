const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:customerNotiffood');
const customerNotiffood = require('../models/customerNotiffood.js');

class customerNotiffoodController{
      async orderfoodtodriver(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await customerNotiffood.orderfoodtodriver(data, res);

          } catch (e) {
            console.log(e);
            let errorResponse = authUtils.processPOSTRequestError();
            res.status(400).json(errorResponse);
          }
        };
    
        let fallback = (err) => {
          console.log(err);
          next(err);
        }
    
        authUtils.processRequestWithJWT(req, callback, fallback);
      }

      async orderfood_customertomerchant(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await customerNotiffood.orderfood_customertomerchant(data, res);

          } catch (e) {
            console.log(e);
            let errorResponse = authUtils.processPOSTRequestError();
            res.status(400).json(errorResponse);
          }
        };
    
        let fallback = (err) => {
          console.log(err);
          next(err);
        }
    
        authUtils.processRequestWithJWT(req, callback, fallback);
      }

      async rejectedfood_customertomerchant(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await customerNotiffood.rejectedfood_customertomerchant(data, res);

          } catch (e) {
            console.log(e);
            let errorResponse = authUtils.processPOSTRequestError();
            res.status(400).json(errorResponse);
          }
        };
    
        let fallback = (err) => {
          console.log(err);
          next(err);
        }
    
        authUtils.processRequestWithJWT(req, callback, fallback);
      }
    

    

}

module.exports = new customerNotiffoodController();