const debug = require('debug')('app:model:user');
const pool = require('../libs/db');
const pricetb = 'pricing.pricing_rule';

class DashboardPriceModel {

    async pricingpost(newPrice) {

        var d = new Date(Date.now());
        newPrice = [newPrice.description, newPrice.multiplier, newPrice.zero_point, newPrice.service, d, d]
        try {
            let res = await pool.query('INSERT INTO ' + pricetb + '(description, multiplier, zero_point, service, created_at, updated_at)VALUES ($1, $2, $3, $4, $5, $6) RETURNING rule_id, service, description, multiplier, zero_point, created_at, updated_at', newPrice);
            debug('pricingpost %o', res);
            if (res.rowCount <= 0) {
                console.log("Data inputan kurang");
                return {
                    "status": "404",
                    "errors": "Data inputan kurang"
                }
            } else {
                return res.rows[0]
            }
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }

    async pricingget(service) {

        try {
            let res = await pool.query(`SELECT * FROM ${pricetb} WHERE "service" = '${service}' ORDER BY created_at ASC`);
            debug('pricingget %o', res);
            if (res.rowCount <= 0) {
                console.log("service Tidak Tersedia");
                return {
                    "status": "404",
                    "errors": "service " + service + " tidak terdaftar"
                }
            } else {
                return res.rows[0]
            }
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }
}

module.exports = new DashboardPriceModel();