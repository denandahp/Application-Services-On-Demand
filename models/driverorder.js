const debug = require('debug')('app:model:user');
const pool = require('../libs/db');
const {
    hash
} = require('bcrypt');
const jsotp = require('jsotp');
const totp = jsotp.TOTP('BASE32ENCODEDSECRET');

const schema = '"public"';
const table = '"users"'
const dbTable = schema + '.' + table;
const jfoodviews = 'orders.jfood';
const orderstb = 'orders.orders';

class DriverOrderModel {

    async incomingorder(kode) {

        try {
            let res = await pool.query(`SELECT * FROM ${jfoodviews} WHERE "kode" = '${kode}'`);
            debug('incomingorder %o', res);
            if (res.rowCount <= 0) {
                console.log("Kode Tidak Tersedia");
                return {
                    "status": "404",
                    "errors": "Kode " + kode + " tidak terdaftar"
                }
            } else {
                return res.rows[0];
            }
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }

    async acceptorder(kode, id) {
        try {
            pool.query("call orders.order_jfood_accepted_by_driver('" + kode + "', _driver_id => " + id + ")", (error, results) => {
                if (error) {
                    return console.error(error.message);
                }
            });
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }

    async dataorder(kode) {

        try {
            let driver = await pool.query(`SELECT latitude_location_driver_start, longitude_location_driver_start FROM ${orderstb} WHERE "kode" = '${kode}'`);
            let res = await pool.query(`SELECT latitude_restaurant, longitude_restaurant, customer_name, phone, landmark_restaurant, address_restaurant FROM ${jfoodviews} WHERE "kode" = '${kode}'`);
            debug('dataorder %o', res);
            if (res.rowCount <= 0) {
                console.log("Kode Tidak Tersedia");
                return {
                    "status": "404",
                    "errors": "Kode " + kode + " tidak terdaftar"
                }
            } else {
                return {
                    driver: driver.rows[0],
                    order: res.rows[0]
                }
            }
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }

    async rejectorder(kode, id) {
        try {
            pool.query("call orders.order_jfood_rejected_by_driver('" + kode + "', _driver_id => " + id + ")", (error, results) => {
                if (error) {
                    return console.error(error.message);
                }
            });
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }

    async updatedatadriver(id, lat, long, token) {

        try {
            let res = await pool.query("UPDATE " + dbTable + " SET (latitude_position, longitude_position, token_notification) = ($1, $2, $3) WHERE id = " + id + " RETURNING latitude_position, longitude_position, token_notification", [lat, long, token]);
            debug('updatedatadriver %o', res);
            if (res.rowCount <= 0) {
                throw 'Edit fail';
            } else {
                return res.rows[0]
            }
        } catch (ex) {
            console.log('Enek seng salah iki ' + ex)
        };
    }

}

module.exports = new DriverOrderModel();