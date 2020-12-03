const Router = require('express').Router();
const comment = require('../controllers/comment.js');

Router.post('/comment/add', comment.add)
      .post('/comment/update', comment.update)
      .get('/comment/:comment_id', comment.get)
 

module.exports = Router;