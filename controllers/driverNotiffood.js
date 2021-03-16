const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:driverNotiffood');
const driverNotiffood = require('../models/driverNotiffood.js');
const convimage = require('./convimage.js');

const config = require('../configs.json');

class driverNotiffoodController{
    async orderfood_drivertomerchant(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await driverNotiffood.orderfood_drivertomerchant(data, res);

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

    async orderfood_drivertocustomer(req, res, next) {
      let callback = async () => {
     
        try {
          let data = req.body;
          let result = await driverNotiffood.orderfood_drivertocustomer(data, res);

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
    
    async processfood_drivertocustomer(req, res, next) {
      let callback = async () => {
     
        try {
          let data = req.body;
          let result = await driverNotiffood.processfood_drivertocustomer(data, res);

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

    async deliverfood_drivertocustomer(req, res, next) {
      let callback = async () => {
     
        try {
          let data = req.body;
          let result = await driverNotiffood.deliverfood_drivertocustomer(data, res);

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

    async arrivedfood_drivertocustomer(req, res, next) {
      let callback = async () => {
     
        try {
          let data = req.body;
          let result = await driverNotiffood.arrivedfood_drivertocustomer(data, res);

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