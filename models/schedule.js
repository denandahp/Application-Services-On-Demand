const debug = require('debug')('app:controller:schedule');
const pool = require('../libs/db');

const schema = '"public"';
const table = '"schedule"';
const dbTable = schema + '.' + table;

class scheduleModel{
    async register (data) {
        let value =  [ data.username, data.schedule_name, data.schedule_date, data.schedule_lastdate]
        console.log(value);
        let res = await pool.query('INSERT INTO ' + dbTable + ' (username, schedule_name, schedule_date, schedule_lastdate) VALUES ($1, $2, $3, $4) RETURNING *;', value);
        debug('register %o', res);
    
        return res;
      }

    async update (data) {

        let sets =[data.schedule_id, data.username, data.schedule_name, data.schedule_lastdate]
        let res = await pool.query('UPDATE ' + dbTable + 'SET (username, schedule_name, schedule_lastdate)  = ($2, $3, $4) WHERE schedule_id = $1 RETURNING username, schedule_lastdate;', sets);
        debug('update %o', res);
        let result = res.rows[0];
        return result;
    }

    async get(schedule_id) {

        let res;
         res = await pool.query(' SELECT * FROM ' + dbTable + ' where schedule_id = $1 ORDER BY schedule_id DESC', [schedule_id])
        debug('get %o', res);
    
        return res.rows;
    
      }


}

module.exports = new scheduleModel();