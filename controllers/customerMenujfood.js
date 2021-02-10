const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:customerMenujfood');
const customerMenujfood = require('../models/customerMenujfood.js');
const convimage = require('./convimage.js');

const config = require('../configs.json');

class customerMenujfoodController{
    async listMenu(req, res, next) {
        let callback = async () => {
         try {
            let restaurant_id = req.params.restaurant_id;
            let result = await customerMenujfood.listMenu(restaurant_id);
            res.status(200).json({
              pesan: "List menu berhasil didapatkan",
              result: result,
            })
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

      async infoResto(req, res, next) {
        let callback = async () => {
         try {
            let restaurant_id = req.params.restaurant_id;
            let result = await customerMenujfood.infoResto(restaurant_id);
            res.status(200).json({
              pesan: "Informasi restaurant berhasil didapatkan",
              result: result,
            })
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

module.exports = new customerMenujfoodController();