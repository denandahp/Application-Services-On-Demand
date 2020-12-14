var base64ToImage = require('base64-to-image');
var fs = require('fs');
var path = require('path');



const convertdata = (username ,base64raw, dataname, namedir) => {
    
        let ipserver = 'http://3.17.236.174:3000/';
        let direction =  path.resolve("./") + '/uploads/'+ namedir +'/' + username +'/';    
        let base64Str = base64raw;
        let optionalObj = {'fileName': username + '_' + Date.now(),'type':'jpg'};
        base64ToImage(base64Str,direction,optionalObj);
        var imageInfo = base64ToImage(base64Str, direction, optionalObj);
        return ipserver + '/' + username + '/' + imageInfo.fileName;
    
}
exports.base64toimage = (userData) => {
    let namedir = 'driver';
    const dir = './uploads/' + namedir +'/'+ userData.username + '/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }

    let data = [userData.photo, userData.tampak_depan, userData.tampak_samping, userData.tampak_belakang, userData.foto_identitas, userData.foto_stnk ];
    let dataname = ['photo', 'tampak_depan', 'tampak_samping', 'tampak_belakang', 'foto_identitas', 'foto_stnk']
    let urlpath = [];

    for (var i = 0; i < data.length; i++) {
        
        if (data[i].length < 30){
            urlpath[i] = 'kosong';
            continue;
         }else{
            let result = convertdata(userData.username, data[i], dataname[i]);
            urlpath[i] = result;
        }
      }
    const body={
        photo : urlpath[0], tampak_depan : urlpath[1], tampak_samping : urlpath[2],
        tampak_belakang : urlpath[3], foto_identitas : urlpath[4], foto_stnk : urlpath[5],
    }
    return body;
}

exports.convImagemerchantpemilik = (userData) => {
    let namedir = 'merchant';
    const dir = './uploads/' + namedir +'/' + userData.username + '/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }

    let data = [userData.infopemilik_kk, userData.infopemilik_ktp ];
    let dataname = ['infopemilik_kk', 'infopemilik_ktp']
    let urlpath = [];

    for (var i = 0; i < data.length; i++) {
        
        if (data[i].length < 30){
            urlpath[i] = 'kosong';
            continue;
         }else{
            let result = convertdata(userData.username, data[i], dataname[i],namedir);
            urlpath[i] = result;
        }
      }
    const body={
        infopemilik_kk : urlpath[0], infopemilik_ktp : urlpath[1]
    }
      
    return body;
}