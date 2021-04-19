const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:driverNotifjride');
const driverNotifjride = require('../models/driverNotifjride.js');
const convimage = require('./convimage.js');

const config = require('../configs.json');

class driverNotifjrideController{
    async acceptjride_drivertocustomer(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await driverNotifjride.acceptjride_drivertocustomer(data, res);

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

    async deliverjride_drivertocustomer(req, res, next) {
      let callback = async () => {
     
        try {
          let data = req.body;
          let result = await driverNotifjride.deliverjride_drivertocustomer(data, res);

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
    
    async finishedjride_drivertocustomer(req, res, next) {
      let callback = async () => {
     
        try {
          let data = req.body;
          let result = await driverNotifjride.finishedjride_drivertocustomer(data, res);

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

module.exports = new driverNotifjrideController();