const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:customerNotifjride');
const customerNotifjride = require('../models/customerNotifjride.js');

class customerNotifjrideController{

      async orderjride_customertodriver(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await customerNotifjride.orderjride_customertodriver(data, res);

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

module.exports = new customerNotifjrideController();