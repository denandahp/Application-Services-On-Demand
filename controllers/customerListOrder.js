const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:customerListOrder');
const customerListOrder = require('../models/customerListOrder.js');

class customerListOrderController{
    async listorder(req, res, next) {
        let callback = async () => {
         try {
            let id_user = req.params.id_user;
            let result = await customerListOrder.listorder(id_user);
            res.status(200).json({
              pesan: "List order user",
              service : "J-FOOD",
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

      async detailorder(req, res, next) {
        let callback = async () => {
         try {
            let id_user = req.params.id_user;
            let kode = req.params.kode;
            let result = await customerListOrder.detailorder(id_user, kode);
            res.status(200).json({
              pesan: "detail pesanan",
              service : "J-FOOD",
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

module.exports = new customerListOrderController();