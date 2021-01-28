const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


const s3 = new aws.S3({

    accessKeyId: 'AKIAIDNMQXLE7HX2SERQ',
    secretAccessKey: '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',
    region: 'us-east-2'

});
exports.paramS3 = (req, res) => {
    const upload = multer({
        storage: multerS3({
          s3: s3,
          bucket: 'jatstorage',
          acl: 'public-read',
          contentType : multerS3.AUTO_CONTENT_TYPE,
          metadata: function (req, file, cb) {
            const [role, id_user, page, nama] = file.originalname.split('_');
            cb(null, {fieldName: "apps_" + role + "_"+ id_user + "_" + nama});
          },
          key: function (req, file, cb) {
            let fileUpload = JSON.parse(JSON.stringify(file.originalname).replace(/_/g, "/"));
            console.log(fileUpload);
            cb(null,fileUpload)
          }
        })
      })

      return upload.array('image',12);
}


exports.singleImage = (req, res) => {
    let singleImage = upload.single('image');
    singleImage(req, res, function(err){
        console.log( 'files', req.files );
        if( err ){
            console.log( 'errors', err );
            res.json( { err: err } );
        } else {
            // If File not found
            if( req.files === undefined ){
                console.log( 'Error: No File Selected!' );
                res.json( 'Error: No File Selected' );
            } else {
                // If Success
                console.log('imageUrl = '+ req.file.location);
                return res.json({'imageUrl': req.file.location});
            }
        }
    });
};

exports.multipleImage = (req, res) => {
    let multiUpload = upload.array('image',12);
    multiUpload(req, res, function(err){
        //console.log( 'files', req.files );
        if( err ){
            console.log( 'errors', err );
            res.json( { err: err } );
        } else {
            // If File not found
            if( req.files === undefined ){
                console.log( 'Error: No File Selected!' );
                res.json( 'Error: No File Selected' );
            } else {
                // If Success
                let fileArray = req.files,
                    fileLocation;
                const galleryImgLocationArray = [];
                for ( let i = 0; i < fileArray.length; i++ ) {
                    fileLocation = fileArray[ i ].location;
                    console.log( 'filenm', fileLocation );
                    galleryImgLocationArray.push( fileLocation )
                }
                // Save the file name into database
                return galleryImgLocationArray
            }
        }
    });
};
