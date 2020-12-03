const Router = require('express').Router();
const comment = require('../controllers/comment.js');

Router.post('/add', comment.add)
      .post('/update', comment.update)
      .get('/comment/:comment_id', comment.get)
 

module.exports = Router;