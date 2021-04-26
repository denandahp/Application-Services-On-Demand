const authUtils = require('./authUtils.js');
const paymentActivity = require('../models/driverPayment.js');

class PaymentActivityController {
    async add(req, res, next) {
        let callback = async () => {

            try {
                let data = req.body;
                let result = await paymentActivity.add(data);
                res.status(200).json({
                    pesan: "Topup Saldo Berhasil",
                    activityData: result.rows[0],
                })
            } catch (e) {
                console.log(e);
                let errorResponse = authUtils.processPOSTRequestError();
                res.status(400).json(errorResponse);
            }
        };

        let fallback = (err) => {
            console.log(err);
            next(err);
        }

        authUtils.processRequestWithJWT(req, callback, fallback);
    }

}

module.exports = new PaymentActivityController();