const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:comment');
const comment = require('../models/comment.js');

const config = require('../configs.json');

class commentController{
    async add(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await comment.add(data);
            res.status(200).json({
              pesan: "Comment Berhasil  menyimpan comment",
              activityData: result.rows[0],
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

      async update(req, res, next) {
        let callback = async () => {
     
        try {
            let data = req.body;
            let result = await comment.update(data);
            res.status(200).json({
              pesan: "Comment Berhasil  diperbaharui",
              activityData: result.rows[0],
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

      async get(req, res, next) {
        let callback = async () => {
          let comment_id = req.params.comment_id;
    
          debug('detail %o', comment_id)
      
          try {
            let detail = (await comment.get(comment_id));
      
            res.status(200).json(detail)
      
          } catch (e) {
            console.log(e);
            let errorResponse = authUtils.processGETRequestError();
            res.status(400).json(errorResponse);
          }
        }
    
        let fallback = (err) => {
          console.log(err);
          next(err);
        }
    
        authUtils.processRequestWithJWT(req, callback, fallback);
      }
}

module.exports = new commentController();