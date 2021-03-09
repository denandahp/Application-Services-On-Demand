const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:customerFilterfood');
const customerFilterfood = require('../models/customerFilterfood.js');
const convimage = require('./convimage.js');

const config = require('../configs.json');

class customerFilterfoodController{
    async searchbyName(req, res, next) {
        let callback = async () => {
     
         try {
  
          let data = req.query;
            let result = await customerFilterfood.searchbyName(data);
            res.status(200).json({
              pesan: "Hasil Filter",
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

      async searchBycategory(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.query;
            //let data = {page, limit, idKategori, latitude, longitude};
            let result = await customerFilterfood.searchBycategory(data);
            res.status(200).json({
              pesan: "Hasil Filter kategori",
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

      
      async jFoodlist(req, res, next) {
        let callback = async () => {
     
         try {
            let result = await customerFilterfood.jFoodlist();
            res.status(200).json({
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

      async filterinname(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.query;
            //let data = {page, limit, idKategori, latitude, longitude};
            let result = await customerFilterfood.filterinname(data);
            res.status(200).json({
              pesan: "Hasil Filter Restaurant",
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

      async filterincategory(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.query;
            //let data = {page, limit, idKategori, latitude, longitude};
            let result = await customerFilterfood.filterincategory(data);
            res.status(200).json({
              pesan: "Hasil Filter kategori",
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

module.exports = new customerFilterfoodController();