const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:merchantNotiffood');
const merchantNotiffood = require('../models/merchantNotiffood.js');
const convimage = require('./convimage.js');

const config = require('../configs.json');

class merchantNotiffoodController{
      async orderfood_merchanttodriver(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await merchantNotiffood.orderfood_merchanttodriver(data, res);

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

      async rejectedfood_merchanttocustomer(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await merchantNotiffood.rejectedfood_merchanttocustomer(data, res);

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
    

      async processfood_merchanttodriver(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await merchantNotiffood.processfood_merchanttodriver(data, res);

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

module.exports = new merchantNotiffoodController();