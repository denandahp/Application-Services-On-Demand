const debug = require('debug')('app:controller:customerNotiffood');
const pool = require('../libs/db');
const notifbody = require('./notificationBody.js');
var admin = require("firebase-admin");
var serviceAccount = require('../private_key_firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const schema = '"merchant"';
const table = '"user"';

class customerNotiffoodModel{
    async orderfoodtodriver (data, res) {
      try{
        let result = await pool.query('SELECT * FROM' + dbTable + '($1, $2) RETURNING *;', [data.latitude, data.longitude]);
        console.log(result.rows[0]);
        let body = await notifbody.orderfoodtodriver(data,result);
        
        await admin.messaging().send(body.payload)
            .then(function(response) {
              console.log('Successfully sent message:', response);
              res.status(200).json({
                pesan: "notifikasi terkirim",
                result: response.results,
                driver: result.rows[0]
              })
            })
            .catch(function(error) {
              console.log('Error sending message:', error);
            });
      }catch(ex){
        console.log('Enek seng salah iki ' + ex)
      };
    }

    async update (data, datagambar) {
      var d = new Date(Date.now());
        console.log(datagambar);
        let sets = [data.id, data.name, datagambar.media_family, datagambar.media_identity, data.no_identity, data.birthday, d, data.state_profil_pemilik]
        let res = await pool.query('UPDATE' + dbTable + 'SET (name, media_family, media_identity, no_identity, birthday, updated_at, state_profil_pemilik) = ($2, $3, $4, $5, $6, $7, $8) WHERE id = $1 RETURNING *;', sets);
        debug('update %o', res);
        let result = res.rows[0];
        return result;
    }

    async get(id) {

      let res;
      if(id == 'all'){
        res = await pool.query(' SELECT * FROM ' + dbTable + 'ORDER BY id DESC')
      }else {
        res = await pool.query(' SELECT * FROM ' + dbTable + ' where id = $1 ORDER BY id DESC', [id])
      }
      
      debug('get %o', res);

      return res.rows;

    }

}

module.exports = new customerNotiffoodModel();