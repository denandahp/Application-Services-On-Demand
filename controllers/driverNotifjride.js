const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:driverNotiffood');
const driverNotiffood = require('../models/driverNotiffood.js');
const convimage = require('./convimage.js');

const config = require('../configs.json');

class driverNotiffoodController{
    async acceptjride_drivertocustomer(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await driverNotiffood.acceptjride_drivertocustomer(data, res);

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
          let result = await driverNotiffood.deliverjride_drivertocustomer(data, res);

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
          let result = await driverNotiffood.finishedjride_drivertocustomer(data, res);

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

module.exports = new driverNotiffoodController();