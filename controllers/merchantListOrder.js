const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:merchantListOrder');
const merchantListOrder = require('../models/merchantListOrder.js');

class merchantListOrderController{
    async listorder(req, res, next) {
        let callback = async () => {
         try {
            let id_merchant = req.params.id_merchant;
            let result = await merchantListOrder.listorder(id_merchant);
            res.status(200).json({
              pesan: "List order user",
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
            let id_merchant = req.params.id_merchant;
            let kode = req.params.kode;
            let result = await merchantListOrder.detailorder(id_merchant, kode);
            res.status(200).json({
              pesan: "detail pesanan",
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

module.exports = new merchantListOrderController();