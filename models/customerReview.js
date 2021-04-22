const debug = require('debug')('app:controller:customerReview');
const pool = require('../libs/db');
const notifbody = require('./notificationBody.js');

const schema = '"complaint"';
const table = '"review"';
const dbTable = schema + '.' + table;

class customerReviewModel{

    async driverreview (data) {
      try{
        var d = new Date(Date.now());;d.toLocaleString('en-GB', { timeZone: 'Asia/Jakarta' });
        let sets = [data.user_id, data.driver_id, data.role, data.service, data.rate, data.comment, d, d, data.kode]
        let res = await pool.query('INSERT INTO ' + dbTable + ' (user_id, driver_id, role, service, rate, comment, created_at, updated_at, kode)' + 
                                  ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;', sets);
        debug('update %o', res);
        let result = res.rows[0];
        return result;
      }catch(ex){
        console.log('Enek seng salah iki ' + ex)
      };
    }

    async merchantreview (data) {
        try{
            var d = new Date(Date.now());;d.toLocaleString('en-GB', { timeZone: 'Asia/Jakarta' });
            let sets = [data.user_id, data.restaurant_id, data.role, data.service, data.rate, data.comment, d, d, data.kode]
            let res = await pool.query('INSERT INTO ' + dbTable + ' (user_id, restaurant_id, role, service, rate, comment, created_at, updated_at, kode)' + 
                                      ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;', sets);
            debug('update %o', res);
            let result = res.rows[0];
            return result;
          }catch(ex){
            console.log('Enek seng salah iki ' + ex)
          };
    }

}

module.exports = new customerReviewModel();