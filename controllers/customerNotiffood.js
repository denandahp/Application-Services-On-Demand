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

      async searchBycategory(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.query;
            //let data = {page, limit, idKategori, hargaMin, hargaMax, jenisMakanan, penilaian, sortBy, data};
            let result = await customerNotiffood.searchBycategory(data);
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

module.exports = new customerNotiffoodController();