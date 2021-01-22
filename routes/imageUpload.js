const Router = require("express").Router();
const uploads = require('../services/fileUpload');

const singleUpload = uploads.single('image');
const multiUpload = uploads.array('image',3);

Router.post('/post',singleUpload, function(req,res){
    singleUpload(req, res, function(err){
        return res.json({'imageUrl': req.file.location});
    });
});


module.exports = Router;