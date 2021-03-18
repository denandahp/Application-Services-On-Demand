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
            let order = await pool.query(`SELECT  kode, jarak, latitude_restaurant, longitude_restaurant, landmark_restaurant, address_restaurant, jumlah_menu, jumlah_pesanan, menu_name, menu_quantity, menu_catatan, menu_price_merchant, menu_price_customer, metode_pembayaran, customer_name, phone, landmark_destination, address_destination, latitude_destination, longitude_destination FROM ${jfoodviews} WHERE "kode" = '${kode}'`);
            debug('dataorder %o', order);
            if (order.rowCount <= 0) {
                console.log("Kode Tidak Tersedia");
                return {
                    "status": "404",
                    "errors": "Kode " + kode + " tidak terdaftar"
                }
            } else {
                return {
                    driver: driver.rows[0],
                    order: order.rows,
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

    async verifikasi(kode, verifikasi) {

        try {
            let code = await pool.query(`SELECT driver_verification_code FROM ${orderstb} WHERE "kode" = '${kode}'`);
            let new_status = "Driver sudah mengambil pesanan"
            if (code.rows[0].driver_verification_code == verifikasi) {
                let res = await pool.query(`UPDATE ${orderstb} SET status = ($1) WHERE "kode" = '${kode}' RETURNING status`, [new_status]);
                debug('verifikasi %o', res);
                if (res.rowCount > 0) {
                    return res.rows[0]
                }
            } else {
                console.log("Kode Tidak Cocok");
                return {
                    "status": "404",
                    "errors": "Kode " + verifikasi + " tidak cocok"
                }
            }
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }

    async antarkanpesanan(kode) {

        try {
            let new_status = "Driver mengantarkan pesanan"
            let res = await pool.query(`UPDATE ${orderstb} SET status = ($1) WHERE "kode" = '${kode}' RETURNING status`, [new_status]);
            debug('antarkanpesanan %o', res);
            if (res.rowCount <= 0) {
                console.log("Kode Tidak Terdaftar");
                return {
                    "status": "404",
                    "errors": "Kode " + kode + " tidak terdaftar"
                }
            } else {
                return res.rows[0]
            }
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }

    async selesaiantar(kode) {

        try {
            let new_status = "Driver sudah dilokasi"
            let res = await pool.query(`UPDATE ${orderstb} SET status = ($1) WHERE "kode" = '${kode}' RETURNING status`, [new_status]);
            debug('selesaiantar %o', res);
            if (res.rowCount <= 0) {
                console.log("Kode Tidak Terdaftar");
                return {
                    "status": "404",
                    "errors": "Kode " + kode + " tidak terdaftar"
                }
            } else {
                return res.rows[0]
            }
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }
}

module.exports = new DriverOrderModel();