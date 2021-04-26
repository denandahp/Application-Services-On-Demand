const axios = require('axios');
const pool = require('../libs/db');
const topuptb = 'driver.topup';

class PaymentIntegrationController {
    async generateSnap(req, res, next) {

        var d = new Date(Date.now());
        var dd = d.getDate();
        var mm = d.getMonth();
        var y = d.getFullYear();
        var hour = d.getHours();
        var minute = d.getMinutes();
        var second = d.getSeconds();
        var FormattedDate = y + mm + dd + '-' + hour + minute + second;

        let id = req.user.data.id;
        let nd = req.user.data.namadepan;
        let nb = req.user.data.namabelakang;
        let email = req.user.data.email;
        let phone = req.user.data.phone;
        let nominal = req.body.transaction_details.gross_amount;
        req.body.transaction_details.order_id = "driver-" + id + "-" + FormattedDate + "-" + nominal;
        req.body.customer_details.first_name = nd;
        req.body.customer_details.last_name = nb;
        req.body.customer_details.email = email;
        req.body.customer_details.phone = phone;
        req.body.credit_card.secure = true;
        let topup_id = req.body.transaction_details.order_id;
        let value = [topup_id, id, 'PENDING', nominal, d, d]

        try {
            const result = await axios({
                method: "post",
                url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Basic " +
                        Buffer.from("SB-Mid-server-YSRtOBQ5Oe6FtdO81TOL1vfZ").toString("base64")
                },
                data: req.body
            }).then(response => {
                console.log(response.data.token);
                req.body.transaction_details.token = response.data
                res.status(200).json(response.data);
            })
            if (res.status(200)) {
                await pool.query('INSERT INTO ' + topuptb + ' (topup_id, driver_id, transaction_status, nominal, created_at, updated_at)VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', value);
            }
        } catch (error) {
            res.send(error)
        }
    }
}
module.exports = new PaymentIntegrationController();