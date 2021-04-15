const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:customerReview');
const customerReview = require('../models/customerReview.js');
const convimage = require('./convimage.js');

const config = require('../configs.json');

class customerReviewController{
    async driverreview(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await customerReview.driverreview(data);
            let pesan = "Review DRIVER oleh id " + data.user_id + " berhasil ditambahkan" ;
            res.status(200).json({
                pesan: pesan,
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

    async merchantreview(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await customerReview.merchantreview(data);
            let pesan = "Review MERCHANT oleh id " + data.user_id + " berhasil ditambahkan" ;
            res.status(200).json({
              pesan: pesan,
              result: result.result,
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

module.exports = new customerReviewController();