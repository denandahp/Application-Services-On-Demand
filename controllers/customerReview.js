const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:customerReview');
const customerReview = require('../models/customerReview.js');
const convimage = require('./convimage.js');

const config = require('../configs.json');

class customerReviewController{
    async jfooddriverreview(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await customerReview.jfooddriverreview(data);
            let pesan = "Review JFOOD DRIVER oleh id " + data.user_id + " berhasil ditambahkan" ;
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

    async jfoodmerchantreview(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await customerReview.jfoodmerchantreview(data);
            let pesan = "Review JFOOD MERCHANT oleh id " + data.user_id + " berhasil ditambahkan" ;
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

    async jridedriverreview(req, res, next) {
      let callback = async () => {
   
       try {
          let data = req.body;
          let result = await customerReview.jridedriverreview(data);
          let pesan = "Review JRIDE DRIVER oleh id " + data.user_id + " berhasil ditambahkan" ;
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


    


}

module.exports = new customerReviewController();