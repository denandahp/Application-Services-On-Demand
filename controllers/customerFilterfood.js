const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:customerFilterfood');
const customerFilterfood = require('../models/customerFilterfood.js');
const convimage = require('./convimage.js');

const config = require('../configs.json');

class customerFilterfoodController{
    async searchbyName(req, res, next) {
        let callback = async () => {
     
         try {
          let page = parseInt(req.query.page);
          let limit = parseInt(req.query.limit);
          let filterName = req.query.filterName;
            let result = await customerFilterfood.searchbyName(page, limit, filterName);
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
            //let data = {page, limit, idKategori, hargaMin, hargaMax, jenisMakanan, penilaian, sortBy, data};
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


}

module.exports = new customerFilterfoodController();