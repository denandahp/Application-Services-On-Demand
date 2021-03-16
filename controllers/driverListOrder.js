const user = require('../models/driverListOrder.js');

class DriverListOrderController {

    async driverlistorder(req, res, next) {

        let kode = req.params.kode
        try {
            let result = await user.driverlistorder(kode);
            if (result.status == 404) {
                res.status(404).json({
                    status: res.statusCode,
                    message: result.errors
                });
            } else {
                res.status(200).send({
                    status: res.statusCode,
                    data: result
                })
            }
        } catch (e) {
            next(e.detail);
        }
    }

}

module.exports = new DriverListOrderController();