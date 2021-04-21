const debug = require('debug')('app:model:user');
const pool = require('../libs/db');
const {
    hash
} = require('bcrypt');
const jsotp = require('jsotp');
const totp = jsotp.TOTP('BASE32ENCODEDSECRET');

const orderstb = 'orders.orders_jride';

class DriverRideOrderModel {

    async incomingorder(kode) {

        try {
            let order = await pool.query(`SELECT token_customer, token_driver, landmark_pickup, address_pickup, latitude_location_destination, longitude_location_destination, distance, ongkir, kode_promo, total_price_driver FROM ${orderstb} WHERE "kode" = '${kode}'`);
            debug('incomingorder %o', order);
            if (order.rowCount <= 0) {
                console.log("Kode Tidak Tersedia");
                return {
                    "status": "404",
                    "errors": "Kode " + kode + " tidak terdaftar"
                }
            } else {
                return order.rows[0]
            }
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }

    async acceptorder(kode, id, token, lat, long) {
        try {
            return new Promise((resolve, reject) => {

                pool.query(`call orders.order_jride_accepted_by_driver( _kode => '${kode}', _driver_id => '${id}', _token_driver => '${token}', _latitude_location_driver_start => '${lat}', _longitude_location_driver_start => '${long}')`, (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log(kode + " accepted by driver");
                    return resolve(kode + " accepted by driver");
                })
            })
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }

    async rejectorder(kode, id, lat, long, reason, token) {
        try {
            return new Promise((resolve, reject) => {
                pool.query(`call orders.order_jride_driver_rejected( _kode => '${kode}', _driver_id => '${id}', _latitude_location_driver_start => '${lat}', _longitude_location_driver_start => '${long}', _reason_driver_rejected => '${reason}', _token_driver => '${token}')`, (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log(kode + " rejected by driver");
                    return resolve(kode + " rejected by driver");
                })
            })
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }

}

module.exports = new DriverRideOrderModel();