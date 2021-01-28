const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:uploadImage');
const uploadImage = require('../models/uploadImage.js');
const convimage = require('./convimage.js');

const config = require('../configs.json');

class uploadImageController{
    async post(req, res, next) {
        let callback = async () => {
         try {
            let result = await uploadImage.post(req, res);

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

      async delete(req, res, next) {
        let callback = async () => {
     
        try {
            let result = await uploadImage.update(data,response);
            res.status(200).json({
              pesan: "Infousaha Berhasil diperbaharui",
              activityData: result,
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

module.exports = new uploadImageController();